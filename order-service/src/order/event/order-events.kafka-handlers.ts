

import { CreateOrderDto } from '../dto/create-order.dto';
import { CreateOrderEvent } from './create-order.event';
import { DeleteOrderEvent } from './delete-order.event';

export const OrderEventKafkaHandlers = {
  CreateOrderEvent: (id: string, data: CreateOrderDto) =>
    new CreateOrderEvent(id, data),
  DeleteOrderEvent: (id: string) => new DeleteOrderEvent(id),
};
