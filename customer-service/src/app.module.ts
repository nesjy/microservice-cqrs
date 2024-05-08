import { Module, OnModuleInit } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CommandBus, CqrsModule, EventBus } from '@nestjs/cqrs';
import { CustomerCommandHandlers } from './commands-handlers';
import { CustomerAdapter } from './customer.adapter';
import { KafkaModule } from './kafka/kafka.module';
import { customerKafkaConfig } from './customer-kafka.config';
import { KafkaService } from './kafka/kafka.service';
import { EventSourcingModule } from 'event-sourcing-nestjs';
import { MongooseModule } from '@nestjs/mongoose';


@Module({
  imports: [
    CqrsModule,
    KafkaModule.register(customerKafkaConfig, 'customer-orders-customer')
  ],
  controllers: [AppController],
  providers: [AppService, ...CustomerCommandHandlers, CustomerAdapter],
})
export class AppModule implements OnModuleInit {
  constructor(
    private readonly command$: CommandBus,
    private readonly event$: EventBus,
    private readonly kafkaService: KafkaService,
  ) {}

  async onModuleInit() {
    this.kafkaService.createProducer();
    this.event$.publisher = this.kafkaService;
    this.command$.register(CustomerCommandHandlers);
  }
}
