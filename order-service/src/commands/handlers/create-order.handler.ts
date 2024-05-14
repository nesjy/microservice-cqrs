import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateOrderCommand } from '../impl';
import { OrderEntity, OrderItemEntity } from '../../entities';
import { OrderStatus } from '../../order/order.enum';
import { Inject } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { Kafka } from 'kafkajs';

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

    try {
      const orderEntity = await this.orderRepository.save({
        customerId: placeOrderDto.customerId,
        productId: placeOrderDto.productId,
        quantity: placeOrderDto.quantity,
        price: placeOrderDto.price,
        status: OrderStatus.Pending,
      });

      return {
        orderId: orderEntity.id,
        customerId: orderEntity.customerId,
        products: placeOrderDto,
      };
    } catch (error) {
      throw new Error(error);
    }
  }
}
