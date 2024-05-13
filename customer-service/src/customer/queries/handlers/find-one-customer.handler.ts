import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Repository } from 'typeorm';

import { CustomerEntity } from '../../../entities';
import { FindOneCustomerQuery } from '../impl';
import { InjectRepository } from '@nestjs/typeorm';

@QueryHandler(FindOneCustomerQuery)
export class FindOneCustomerQueryHandler
  implements IQueryHandler<FindOneCustomerQuery>
{
  constructor(
    @InjectRepository(CustomerEntity)
    private readonly customerRepository: Repository<CustomerEntity>,
  ) {}

  async execute({ customerId }: FindOneCustomerQuery): Promise<CustomerEntity> {
    const user = {
      id: 1,
      fullName: 'test',
      balance: 500
    };
    return user;
  }
}
