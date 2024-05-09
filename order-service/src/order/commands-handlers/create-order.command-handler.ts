import { CommandHandler, ICommandHandler, EventPublisher } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';
import { OrderAdapter } from 'src/order.adapter';
import { CreateOrderCommand } from '../commands/create-order.command';

@CommandHandler(CreateOrderCommand)
export class CreateOrderCommandHandler
  implements ICommandHandler<CreateOrderCommand> {
  private logger = new Logger('CreateOrderCommandHandler');

  constructor(
    private readonly orderAdapter: OrderAdapter,
    private readonly publisher: EventPublisher,
  ) {}

  async execute(command: CreateOrderCommand) {
    this.logger.debug(
      `Running command handler with: ${JSON.stringify(command)}`,
    );

    const { id, createOrderDto } = command;

    const order = this.publisher.mergeObjectContext(
      await this.orderAdapter.createOrder(id, createOrderDto),
    );
    order.commit();
  }
}
