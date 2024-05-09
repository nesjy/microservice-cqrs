import { Module, OnModuleInit } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { EventSourcingModule } from 'event-sourcing-nestjs';
import { CustomerCommandHandlers } from 'src/commands-handlers';
import { CustomerAdapter } from 'src/customer.adapter';
import { CommandBus, CqrsModule, EventBus } from '@nestjs/cqrs';
import { KafkaService } from 'src/kafka/kafka.service';
import { KafkaModule } from 'src/kafka/kafka.module';
import { customerKafkaConfig } from 'src/customer-kafka.config';
import { CustomerController } from './customer.controller';

@Module({
  imports: [
    CqrsModule,
    KafkaModule.register(customerKafkaConfig, 'customer-orders-customer'),
    CustomerModule,
  ],
  controllers: [CustomerController],
  providers: [CustomerService, ...CustomerCommandHandlers, CustomerAdapter],
  
})
export class CustomerModule implements OnModuleInit {
  constructor(
    private readonly command$: CommandBus,
    private readonly event$: EventBus,
    private readonly kafkaService: KafkaService,
  ) {}

  async onModuleInit() {
    this.kafkaService.createConsumer({
      groupId: 'nestjs-customer-orders-customer',
    });
    this.kafkaService.createProducer();
    this.kafkaService.bridgeEventsTo(this.event$.subject$);
    this.event$.publisher = this.kafkaService;
    this.command$.register(CustomerCommandHandlers);
  }
}
