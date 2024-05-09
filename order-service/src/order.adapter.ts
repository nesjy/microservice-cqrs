import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './order/dto/create-order.dto';
import { OrderAggregate } from './order.aggregate';

@Injectable()
export class OrderAdapter {
  async createOrder(
    id: string,
    createOrderDto: CreateOrderDto,
  ) {
    const order = new OrderAggregate(id);
    order.createOrder(createOrderDto);
    console.log(5555);
    return order;
  }

  async deleteOrder(orderId: string) {
    const order = new OrderAggregate(orderId);
    order.deleteOrder();
    return order;
  }
}
