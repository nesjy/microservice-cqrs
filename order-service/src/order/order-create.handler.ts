import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { OrderCreatedEvent } from './order-create.event';
import { Repository } from 'typeorm';
import { OrderEntity } from '../entities';
import { InjectRepository } from '@nestjs/typeorm';
import { EventOrderEntity } from '../entities/event-order.entity';

@EventsHandler(OrderCreatedEvent)
export class OrderCreatedHandler implements IEventHandler<OrderCreatedEvent> {
  constructor(
    @InjectRepository(OrderEntity)
    private readonly eventOrderRepository: Repository<OrderEntity>
  ) {}

  async handle(event: OrderCreatedEvent) {
    // Extract data from the event
    const { orderId, customerId, products } = event;

    // Create a new OrderEntity and save it to the database
    const orderEntity = this.eventOrderRepository.create({
      id: orderId, // Assuming the event provides the order ID
      customerId,
      // Map other properties as needed
    });
    await this.eventOrderRepository.save(orderEntity);
  }
}