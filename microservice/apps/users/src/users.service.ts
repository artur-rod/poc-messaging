import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private usersModel: Model<UserDocument>) {}

  async getUser(id: string): Promise<User> {
    return this.usersModel.findOne({ _id: id });
  }
}
