import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { MongooseModule } from '@nestjs/mongoose';
import { MailerModule, MailerService } from '../../../libs/mailer/src';
import { NewsletterController } from './newsletter.controller';
import { NewsletterService } from './newsletter.service';
import { NewsletterUserSchema } from './schemas/newsletter-user.schema';
import { UserSchema } from './schemas/user.schema';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ClientsModule.register([
      {
        name: 'NEWSLETTER_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: [process.env.RMQ_URI],
          queue: process.env.RMQ_NEWSLETTER_QUEUE,
          queueOptions: {},
          noAck: false,
        },
      },
    ]),
    MongooseModule.forRoot(process.env.DATABASE_URI),
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    MongooseModule.forFeature([
      { name: 'NewsletterUser', schema: NewsletterUserSchema },
    ]),
    MailerModule,
  ],
  controllers: [NewsletterController],
  providers: [NewsletterService, MailerService],
})
export class NewsletterModule {}
