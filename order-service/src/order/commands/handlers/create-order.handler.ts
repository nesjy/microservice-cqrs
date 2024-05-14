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
import { firstValueFrom, from, lastValueFrom } from 'rxjs';
import { log } from 'console';
import { OrderCreatedEvent } from '../../order-create.event';

@CommandHandler(CreateOrderCommand)
export class CreateOrderCommandHandler
  implements ICommandHandler<CreateOrderCommand>
{
  constructor(
    @InjectRepository(OrderEntity)
    private readonly orderRepository: Repository<OrderEntity>
  ) {}

  async execute({ placeOrderDto }: CreateOrderCommand): Promise<any> {
    try {
      
      const orderEntity = await this.orderRepository.save({
        customerId: placeOrderDto.customerId,
        productId: placeOrderDto.productId,
        quantity: placeOrderDto.quantity,
        price: placeOrderDto.price,
        status: OrderStatus.Pending,
      });

      const event = new OrderCreatedEvent(orderEntity.id, orderEntity.customerId, placeOrderDto);

      return {
        orderId: orderEntity.id,
        customerId: orderEntity.customerId,
        products: {
          productId: placeOrderDto.productId,
          quantity: placeOrderDto.quantity,
          price: placeOrderDto.price
        }
      };
    } catch (error) {
      throw new Error(error);
    }
  }

}
