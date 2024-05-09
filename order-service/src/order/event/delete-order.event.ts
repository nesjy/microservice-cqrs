import { IEvent } from '@nestjs/cqrs';

export class DeleteOrderEvent implements IEvent {
  constructor(readonly orderId: string) {}
}
