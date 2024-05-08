import { IEvent } from '@nestjs/cqrs';
import { StorableEvent } from 'event-sourcing-nestjs';
import { CreateCustomerDto } from 'src/dto/create-customer.dto';

export class CreateCustomerEvent extends StorableEvent {

    eventAggregate = 'user';
    eventVersion = 1;
    
    constructor(
      readonly id: string,
      readonly createCustomerDto: CreateCustomerDto,
    ) {
      super();
    }
}
