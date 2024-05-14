import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderEntity } from '../entities';
import { OrderItemEntity } from '../entities/order-item.entity';
import { RabbitMq } from '../rabbitmq/rabbitmq.module';
import { CqrsModule } from '@nestjs/cqrs';
import { CommandModule } from './commands/command.module';
import { QueryModule } from './queries/query.module';
import { Kafka } from '@nestjs/microservices/external/kafka.interface';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { OrderCreatedHandler } from './order-create.handler';
import { EventOrderEntity } from '../entities/event-order.entity';
import { CreateOrderCommandHandler } from '../commands';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'customer',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'customer',
            brokers: ['localhost:9092'],
          },
          consumer: {
            groupId: 'customer',
          },
        },
      },
      {
        name: 'payment-kafka-client',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'payment',
            brokers: ['localhost:9092'],
          },
          consumer: {
            groupId: 'payment',
          },
        },
      },
    ]),
    CqrsModule,
    CommandModule,
    QueryModule,
    TypeOrmModule.forFeature([OrderEntity, OrderItemEntity]),
    TypeOrmModule.forFeature([EventOrderEntity]),
  ],
  providers: [OrderService, OrderCreatedHandler, CreateOrderCommandHandler],
  controllers: [OrderController],
  exports: [OrderService],
})
export class OrderModule {}
