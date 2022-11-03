import { NestFactory } from '@nestjs/core';
import { RabbitmqModule } from './rabbitmq.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const RMQ_URI = process.env.RMQ_URI;

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    RabbitmqModule,
    {
      transport: Transport.RMQ,
      options: {
        urls: [RMQ_URI],
        queue: process.env.RMQ_ORDERS_QUEUE,
        queueOptions: {},
        noAck: false,
      },
    },
  );

  await app.listen();
}
bootstrap();
