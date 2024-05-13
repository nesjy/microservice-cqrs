import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerModule } from './customer/customer.module';

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
    CustomerModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
