import { AggregateRoot } from '@nestjs/cqrs';
import { CreateOrderDto } from './order/dto/create-order.dto';
import { CreateOrderEvent } from './order/event/create-order.event';
import { DeleteOrderEvent } from './order/event/delete-order.event';


export class OrderAggregate extends AggregateRoot {
  constructor(private readonly id?: string) {
    super();
  }

  createOrder(createOrderDto: CreateOrderDto) {
    this.apply(new CreateOrderEvent(this.id, createOrderDto));
  }

  deleteOrder() {
    this.apply(new DeleteOrderEvent(this.id));
  }
}
