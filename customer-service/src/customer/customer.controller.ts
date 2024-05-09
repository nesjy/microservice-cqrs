import { Body, Controller, Delete, Param, Post } from '@nestjs/common';
import { CreateCustomerDto } from 'src/dto/create-customer.dto';
import { CustomerService } from './customer.service';

@Controller('customer')
export class CustomerController {
    constructor(private readonly customerService: CustomerService) {}

    @Post()
    createCustomer(
      @Body() createCustomerDto: CreateCustomerDto,
    ): Promise<{ id: string }> {
      return this.customerService.createCustomer(createCustomerDto);
    }
  
    @Delete('/:id')
    deleteCustomer(@Param('id') id: string): Promise<void> {
      return this.customerService.deleteCustomer(id);
    }
}
