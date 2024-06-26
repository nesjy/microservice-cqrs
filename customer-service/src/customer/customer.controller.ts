import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import {
  EventPattern,
  MessagePattern,
  Payload,
  Transport,
} from '@nestjs/microservices';
import { CreateCustomerDto } from './customer.interface';
import { CustomerService } from './customer.service';

@Controller('customers')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Post()
  async createCustomer(@Body() createCustomerDto: CreateCustomerDto) {
    const customer = await this.customerService.createCustomer(
      createCustomerDto,
    );

    return { customer };
  }

  @Get(':id')
  async getCustomer(@Param('id') id: string) {
    // Check if the id is a number (assumption based on the use of 'findOne')
    if (!isNaN(Number(id))) {
      const customer = await this.customerService.findOne(Number(id));
      return { customer };
    } else {
      // Handle the case where the id is not a number (invalid HTTP request)
      return { error: 'Invalid customer ID' };
    }
  }

  @MessagePattern('customer.get')
  async getCustomerFromMessage(@Payload() message: { customerId: number }) {
    const customer = await this.customerService.findOne(message.customerId);
    return { customer };
  }

  @MessagePattern({ cmd: 'processPayment' }, Transport.RMQ)
  async processPayment(
    @Payload() payload: { customerId: number; totalAmount: number },
  ): Promise<boolean> {
    return await this.customerService.processPayment(payload);
  }

  @EventPattern({ cmd: 'refundPayment' }, Transport.RMQ)
  async compensateProcessPayment(
    @Payload() payload: { customerId: number; totalAmount: number },
  ): Promise<boolean> {
    return await this.customerService.compensateProcessPayment(payload);
  }
}
