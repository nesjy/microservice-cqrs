import { ICommand } from '@nestjs/cqrs';
import { CreateOrderDto } from '../dto/create-order.dto';

export class CreateOrderCommand implements ICommand {
  constructor(
    readonly id: string,
    readonly createOrderDto: CreateOrderDto,
  ) {}
}
