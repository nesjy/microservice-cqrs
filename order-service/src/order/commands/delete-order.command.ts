import { ICommand } from '@nestjs/cqrs';

export class DeleteOrderCommand implements ICommand {
  constructor(readonly orderId: string) {}
}
