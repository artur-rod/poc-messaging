import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  NewsletterUser,
  NewsletterUserDocument,
} from './schemas/newsletter-user.schema';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class NewsletterService {
  constructor(
    @InjectModel('User') private usersModel: Model<UserDocument>,
    @InjectModel('User') private newsletterModel: Model<NewsletterUserDocument>,
  ) {}

  async getUser(id: string): Promise<User> {
    return this.usersModel.findOne({ _id: id });
  }

  async addUserToNewsDB(user: User): Promise<NewsletterUser> {
    const firstNewsletter = new Date().toISOString();

    const newsletterUser: NewsletterUser = {
      name: user.name,
      email: user.email,
      lastNewsletter: firstNewsletter,
    };
    return await this.newsletterModel.create(newsletterUser);
  }
}
