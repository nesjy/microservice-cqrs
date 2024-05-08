import { Injectable } from '@nestjs/common';
import { CustomerAggregate } from './customer.aggregate';
import { CreateCustomerDto } from './dto/create-customer.dto';

@Injectable()
export class CustomerAdapter {
  async createCustomer(
    id: string,
    createCustomerDto: CreateCustomerDto,
  ) {
    const customer = new CustomerAggregate(id);
    
    
    customer.createCustomer(createCustomerDto);
    console.log(customer);
    return customer;
  }

  async deleteCustomer(customerId: string) {
    const customer = new CustomerAggregate(customerId);
    customer.deleteCustomer();
    return customer;
  }
}
