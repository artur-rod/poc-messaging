import { UsersService } from './users.service';
import { Controller, Inject } from '@nestjs/common';
import {
  ClientProxy,
  Ctx,
  MessagePattern,
  RmqContext,
} from '@nestjs/microservices';
import { MailerService } from '../../../libs/mailer/src';

@Controller()
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly mailService: MailerService,
    @Inject('USERS_SERVICE') private usersQueue: ClientProxy,
  ) {}

  async onApplicationBootstrap() {
    await this.usersQueue.connect();
  }

  @MessagePattern('users')
  async newUserEmail(@Ctx() context: RmqContext) {
    const payload = JSON.parse(context.getMessage().content.toString());
    console.log(payload);

    const userInfo = await this.usersService.getUser(payload.message);

    const mailTo = userInfo.email;
    const subject = `${userInfo.name} | Account created`;
    const text = `Hello ${userInfo.name}\nYour account has been successfully created`;

    await this.mailService.sendMail(mailTo, subject, text);

    const channel = context.getChannelRef();

    channel.ack(context.getMessage());
  }
}
