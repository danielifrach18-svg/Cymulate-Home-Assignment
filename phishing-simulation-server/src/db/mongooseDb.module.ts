import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { yellow } from 'chalk';
import 'dotenv/config';

const { MONGODB_URI } = process.env;

@Module({
  imports: [MongooseModule.forRoot(MONGODB_URI)],
})
export class MongooseDBModule {
  constructor() {
    console.log(yellow('connected to MongoDB'));
  }
}
