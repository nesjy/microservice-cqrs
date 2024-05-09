import { Body, Controller, Delete, Param, Post } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderService } from './order.service';
import { Ctx, KafkaContext, MessagePattern, Payload } from '@nestjs/microservices';

interface CustomerOrderMessage {
  customerId: string; // Or number, depending on your data type
  createCustomerDto: any;
  // Other relevant customer order properties
}
@Controller('order')
export class OrderController {
    constructor(private readonly orderService: OrderService) {}

    @Post()
    createOrder(
      @Body() createOrderDto: CreateOrderDto,
    ): Promise<{ id: string }> {
      return this.orderService.createOrder(createOrderDto);
    }
  
    @Delete('/:id')
    deleteOrder(@Param('id') id: string): Promise<void> {
      return this.orderService.deleteOrder(id);
    }
    

    @MessagePattern('customer-orders-customer')
    CustomerOrder(@Payload() message: CustomerOrderMessage, @Ctx() context: KafkaContext): any {
      console.log(`Topic: ${context.getTopic()}`);
      
    }
}
