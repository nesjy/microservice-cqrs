import { Module, OnModuleInit } from '@nestjs/common';
import { OrderService } from './order.service';
import { CommandBus, CqrsModule, EventBus } from '@nestjs/cqrs';
import { customerKafkaConfig } from 'src/order-kafka.config';
import { OrderController } from './order.controller';
import { OrderCommandHandlers } from './commands-handlers';
import { OrderAdapter } from 'src/order.adapter';
import { KafkaModule } from './kafka/kafka.module';
import { KafkaService } from './kafka/kafka.service';

@Module({
  imports: [
    CqrsModule,
    KafkaModule.register(customerKafkaConfig, 'customer-orders-customer'),
    OrderModule,
  ],
  controllers: [OrderController],
  providers: [OrderService, ...OrderCommandHandlers, OrderAdapter],
})
export class OrderModule implements OnModuleInit {
  constructor(
    private readonly command$: CommandBus,
    private readonly event$: EventBus,
    private readonly kafkaService: KafkaService,
  ) {}

  async onModuleInit() {
    this.kafkaService.createConsumer({
      groupId: 'orders',
    });
    this.kafkaService.createProducer();
    this.kafkaService.bridgeEventsTo(this.event$.subject$);
    this.event$.publisher = this.kafkaService;
    this.command$.register(OrderCommandHandlers);
  }
}
