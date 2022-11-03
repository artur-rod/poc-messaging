import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type NewsletterUserDocument = NewsletterUser & Document;

@Schema()
export class NewsletterUser {
  @Prop()
  name: string;

  @Prop()
  email: string;

  @Prop()
  lastNewsletter: string;
}

export const NewsletterUserSchema =
  SchemaFactory.createForClass(NewsletterUser);
