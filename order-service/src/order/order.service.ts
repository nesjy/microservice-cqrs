import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { v4 as uuid } from 'uuid';
import { CreateOrderDto } from './dto/create-order.dto';
import { CreateOrderCommand } from './commands/create-order.command';
import { DeleteOrderCommand } from './commands/delete-order.command';

@Injectable()
export class OrderService {
    constructor(private readonly commandBus: CommandBus) {}

    async createOrder(
      createOrderDto: CreateOrderDto,
    ): Promise<{ id: string }> {
      const id = uuid();
      await this.commandBus.execute(
        new CreateOrderCommand(id, createOrderDto),
      );
      return { id };
    }
  
    async deleteOrder(id: string): Promise<void> {
      return this.commandBus.execute(new DeleteOrderCommand(id));
    }
}
