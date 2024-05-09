import { IEvent } from '@nestjs/cqrs';
import { StorableEvent } from 'event-sourcing-nestjs';
import { CreateOrderDto } from '../dto/create-order.dto';

export class CreateOrderEvent extends StorableEvent {

    eventAggregate = 'order';
    eventVersion = 1;
    
    constructor(
      readonly id: string,
      readonly createOrderDto: CreateOrderDto,
    ) {
      super();
    }
}
