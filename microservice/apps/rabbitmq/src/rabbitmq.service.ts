import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order, OrderDocument } from './schemas/order.schema';

@Injectable()
export class RabbitmqService {
  constructor(
    @InjectModel('Order') private ordersModel: Model<OrderDocument>,
  ) {}

  async getOrder(id: string): Promise<Order> {
    return this.ordersModel.findOne({ _id: id });
  }
}
