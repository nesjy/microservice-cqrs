import { ICommand } from '@nestjs/cqrs';
import { CreateCustomerDto } from 'src/dto/create-customer.dto';

export class CreateCustomerCommand implements ICommand {
  constructor(
    readonly id: string,
    readonly createCustomerDto: CreateCustomerDto,
  ) {}
}
