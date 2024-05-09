import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { CreateCustomerCommand } from 'src/commands/create-customer.command';
import { DeleteCustomerCommand } from 'src/commands/delete-customer.command';
import { CreateCustomerDto } from 'src/dto/create-customer.dto';
import { v4 as uuid } from 'uuid';

@Injectable()
export class CustomerService {
    constructor(private readonly commandBus: CommandBus) {}

  async createCustomer(
    createCustomerDto: CreateCustomerDto,
  ): Promise<{ id: string }> {
    const id = uuid();
    await this.commandBus.execute(
      new CreateCustomerCommand(id, createCustomerDto),
    );
    return { id };
  }

  async deleteCustomer(id: string): Promise<void> {
    return this.commandBus.execute(new DeleteCustomerCommand(id));
  }
}
