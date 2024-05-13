import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { QueryHandlers } from '.';
import { CustomerEntity } from '../../entities';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([CustomerEntity]), CqrsModule],
  providers: [...QueryHandlers],
  controllers: [],
})
export class QueryModule {}
