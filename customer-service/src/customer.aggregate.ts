import { AggregateRoot } from '@nestjs/cqrs';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { CreateCustomerEvent } from './event/create-customer.event';
import { DeleteCustomerEvent } from './event/delete-customer.event';


export class CustomerAggregate extends AggregateRoot {
  constructor(private readonly id?: string) {
    super();
  }

  createCustomer(createCustomerDto: CreateCustomerDto) {
    this.apply(new CreateCustomerEvent(this.id, createCustomerDto));
  }

  deleteCustomer() {
    this.apply(new DeleteCustomerEvent(this.id));
  }
}
