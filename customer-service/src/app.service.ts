import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { v4 as uuid } from 'uuid';
import { CreateCustomerCommand } from './commands/create-customer.command';
import { DeleteCustomerCommand } from './commands/delete-customer.command';
import { CreateCustomerDto } from './dto/create-customer.dto';

@Injectable()
export class AppService {

}
