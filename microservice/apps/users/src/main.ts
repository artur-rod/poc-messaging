import { NestFactory } from '@nestjs/core';
import { UsersModule } from './users.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const RMQ_URI = process.env.RMQ_URI;

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    UsersModule,
    {
      transport: Transport.RMQ,
      options: {
        urls: [RMQ_URI],
        queue: process.env.RMQ_USERS_QUEUE,
        queueOptions: {},
        noAck: false,
      },
    },
  );

  await app.listen();
}
bootstrap();
