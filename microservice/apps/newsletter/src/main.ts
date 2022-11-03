import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { NewsletterModule } from './newsletter.module';

async function bootstrap() {
  const RMQ_URI = process.env.RMQ_URI;

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    NewsletterModule,
    {
      transport: Transport.RMQ,
      options: {
        urls: [RMQ_URI],
        queue: process.env.RMQ_NEWSLETTER_QUEUE,
        queueOptions: {},
        noAck: false,
      },
    },
  );
  await app.listen();
}
bootstrap();
