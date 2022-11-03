import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { MongooseModule } from '@nestjs/mongoose';
import { MailerModule, MailerService } from '../../../libs/mailer/src';
import { RabbitmqController } from './rabbitmq.controller';
import { RabbitmqService } from './rabbitmq.service';
import { OrderSchema } from './schemas/order.schema';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ClientsModule.register([
      {
        name: 'ORDERS_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: [process.env.RMQ_URI],
          queue: process.env.RMQ_ORDERS_QUEUE,
          queueOptions: {},
          noAck: false,
        },
      },
    ]),
    MongooseModule.forRoot(process.env.DATABASE_URI),
    MongooseModule.forFeature([{ name: 'Order', schema: OrderSchema }]),
    MailerModule,
  ],
  controllers: [RabbitmqController],
  providers: [RabbitmqService, MailerService],
})
export class RabbitmqModule {}
