import { Injectable } from '@nestjs/common';
import * as sendgrid from '@sendgrid/mail';

@Injectable()
export class MailerService {
  async sendMail(mailTo: string, subject: string, text: string) {
    sendgrid.setApiKey(process.env.SENDGRID_API_KEY);

    const message = {
      to: mailTo,
      from: process.env.SENDGRID_MAIL_SENDER,
      subject,
      text,
    };

    return await sendgrid.send(message);
  }
}
