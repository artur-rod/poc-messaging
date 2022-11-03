import { RabbitmqService } from './rabbitmq.service';
import { Controller, Inject } from '@nestjs/common';
import {
  ClientProxy,
  Ctx,
  MessagePattern,
  RmqContext,
} from '@nestjs/microservices';
import { MailerService } from '../../../libs/mailer/src';

@Controller()
export class RabbitmqController {
  constructor(
    private readonly rabbitmqService: RabbitmqService,
    private readonly mailService: MailerService,
    @Inject('ORDERS_SERVICE') private ordersQueue: ClientProxy,
  ) {}

  async onApplicationBootstrap() {
    await this.ordersQueue.connect();
  }

  @MessagePattern('new_order')
  async newsOrderEmail(@Ctx() context: RmqContext) {
    const payload = JSON.parse(context.getMessage().content.toString());
    console.log(payload);

    const orderInfo = await this.rabbitmqService.getOrder(payload.message);

    const mailTo = orderInfo.email;
    const subject = `Order confirmed`;
    const text = `Hello!\nYour order has been confirmed, look at the details...\n\nProduct: ${orderInfo.product}\nPrice: ${orderInfo.price}`;

    await this.mailService.sendMail(mailTo, subject, text);

    const channel = context.getChannelRef();

    channel.ack(context.getMessage());
  }
}
