import { CommandHandler, ICommandHandler, EventPublisher } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';
import { DeleteOrderCommand } from '../commands/delete-order.command';
import { OrderAdapter } from 'src/order.adapter';

@CommandHandler(DeleteOrderCommand)
export class DeleteOrderCommandHandler
  implements ICommandHandler<DeleteOrderCommand> {
  private logger = new Logger('DeleteOrderCommandHandler');

  constructor(
    private readonly orderAdapter: OrderAdapter,
    private readonly publisher: EventPublisher,
  ) {}

  async execute(command: DeleteOrderCommand) {
    this.logger.debug(
      `Running command handler with: ${JSON.stringify(command)}`,
    );

    const { orderId } = command;
    const order = this.publisher.mergeObjectContext(
      await this.orderAdapter.deleteOrder(orderId),
    );
    order.commit();
  }
}
