import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { MongooseModule } from '@nestjs/mongoose';
import { MailerModule, MailerService } from '../../../libs/mailer/src';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UserSchema } from './schemas/user.schema';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ClientsModule.register([
      {
        name: 'USERS_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: [process.env.RMQ_URI],
          queue: process.env.RMQ_USERS_QUEUE,
          queueOptions: {},
          noAck: false,
        },
      },
    ]),
    MongooseModule.forRoot(process.env.DATABASE_URI),
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    MailerModule,
  ],
  controllers: [UsersController],
  providers: [UsersService, MailerService],
})
export class UsersModule {}
