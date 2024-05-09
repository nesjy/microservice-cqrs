import { Module, OnModuleInit } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CommandBus, CqrsModule, EventBus } from '@nestjs/cqrs';
import { CustomerCommandHandlers } from './commands-handlers';
import { CustomerAdapter } from './customer.adapter';
import { KafkaModule } from './kafka/kafka.module';
import { customerKafkaConfig } from './customer-kafka.config';
import { KafkaService } from './kafka/kafka.service';
import { EventSourcingModule } from 'event-sourcing-nestjs';
import { CustomerController } from './customer/customer.controller';
import { CustomerModule } from './customer/customer.module';


@Module({
  imports: [
    CustomerModule,
  ],
  controllers: [],
  providers: [AppService],

})
export class AppModule {}
