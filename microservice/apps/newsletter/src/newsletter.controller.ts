import { Controller, Inject } from '@nestjs/common';
import {
  ClientProxy,
  Ctx,
  MessagePattern,
  RmqContext,
} from '@nestjs/microservices';
import { MailerService } from '../../../libs/mailer/src';
import { NewsletterService } from './newsletter.service';

@Controller()
export class NewsletterController {
  constructor(
    private readonly appService: NewsletterService,
    private readonly mailService: MailerService,
    @Inject('NEWSLETTER_SERVICE') private newsletterQueue: ClientProxy,
  ) {}

  async onApplicationBootstrap() {
    await this.newsletterQueue.connect();
  }

  @MessagePattern('users')
  async newsletterEmail(@Ctx() context: RmqContext) {
    const payload = JSON.parse(context.getMessage().content.toString());
    console.log(payload);

    const userInfo = await this.appService.getUser(payload.message);

    const mailTo = userInfo.email;
    const subject = `Newsletter for ${userInfo.name}`;
    const text = `Hello ${userInfo.name}\nHere you will receive every promotion sooner than everyone`;

    await this.mailService.sendMail(mailTo, subject, text);
    await this.appService.addUserToNewsDB(userInfo);

    const channel = context.getChannelRef();
    channel.ack(context.getMessage());
  }
}
