import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { OrderEntity } from '../../../entities';
import { OrderStatus } from '../../order.enum';
import { OrderItemEntity } from '../../../entities/order-item.entity';
import { CreateOrderCommand } from '../impl';
import { ClientKafka } from '@nestjs/microservices';
import { Inject } from '@nestjs/common';
import { Kafka, Partitioners } from 'kafkajs';
import { from, lastValueFrom } from 'rxjs';
import { log } from 'console';

@CommandHandler(CreateOrderCommand)
export class CreateOrderCommandHandler
  implements ICommandHandler<CreateOrderCommand>
{
  constructor(
    @InjectRepository(OrderEntity)
    private readonly orderRepository: Repository<OrderEntity>,
    @InjectRepository(OrderItemEntity)
    private readonly orderItemRepository: Repository<OrderItemEntity>,
  ) {}

  async execute({ placeOrderDto }: CreateOrderCommand): Promise<any> {
    const kafka = new Kafka({
      brokers: ['localhost:9092'],
    });

    const producer = kafka.producer({
      createPartitioner: Partitioners.LegacyPartitioner,
    });

    await producer.connect(); 
    const result = await producer.send({
      topic: 'customer.get',
      messages: [
        {
          value: JSON.stringify(placeOrderDto),
        },
      ],
    });

    // Convert the result to an Observable
    const resultObservable = from(result);
    const consumer = kafka.consumer({ groupId: 'customer' })

    // Use lastValueFrom with the Observable
    const availbleProducts = await lastValueFrom(resultObservable);
    console.log(availbleProducts);
    
 
    
    await producer.disconnect(); // Disconnect the producer

    // try {

    //   const orderEntity = await this.orderRepository.save(
    //     {
    //       ...placeOrderDto,
    //       status: OrderStatus.Pending,
    //     },
    //     {
    //       transaction: false,
    //     },
    //   );
    //   await this.orderItemRepository.save(
    //     placeOrderDto.items.map((orderItem) => ({
    //       ...orderItem,
    //       order: {
    //         id: orderEntity.id,
    //       },
    //     })),
    //     {
    //       transaction: false,
    //     },
    //   );

    //   const totalAmount = placeOrderDto.items.reduce(
    //     (prev, current) => prev + current.price,
    //     0,
    //   );

    //   return {
    //     orderId: orderEntity.id,
    //     customerId: orderEntity.customerId,
    //     products: placeOrderDto.items,
    //     totalAmount,
    //   };
    // } catch (error) {
    //   throw new Error(error);
    // }
  }
}
