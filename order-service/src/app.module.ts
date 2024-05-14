import { Module } from '@nestjs/common';
import { OrderModule } from './order/order.module';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule], // Access environment variables here
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: 'mongodb', // Use environment variable
        url: 'mongodb://mongoadmin:mongoadmin@localhost:27017/eventstore?directConnection=true&authSource=admin', // Adjust for your database type
        entities: [__dirname + '/entities/**.entity{.ts,.js}'],
        migrations: ['src/migrations/migrations/*{.ts,.js}'],
        logging: true,
        synchronize: true,
        migrationsRun: true,
        migrationsTableName: 'migrations',
      }),
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule], // Access environment variables here
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: 'mongodb', // Use environment variable
        url: 'mongodb://mongoadmin:mongoadmin@localhost:27017/dataStore?directConnection=true&authSource=admin', // Adjust for your database type
        entities: [__dirname + '/entities/**.entity{.ts,.js}'],
        migrations: ['src/migrations/migrations/*{.ts,.js}'],
        logging: true,
        synchronize: true,
        migrationsRun: true,
        migrationsTableName: 'migrations',
      }),
    }),
    OrderModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
