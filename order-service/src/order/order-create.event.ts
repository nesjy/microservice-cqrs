export class OrderCreatedEvent {
    constructor(public readonly orderId: number, public readonly customerId: number, public readonly products: any) {}
  }