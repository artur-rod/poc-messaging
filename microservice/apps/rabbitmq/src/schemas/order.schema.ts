import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type OrderDocument = Order & Document;

@Schema()
export class Order {
  @Prop()
  product: string;

  @Prop()
  price: string;

  @Prop()
  email: string;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
