import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { yellow } from 'chalk';

const { MONGODB_URI } = process.env;

@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost:27017/phishing-db')],
})
export class MongooseDBModule {
  constructor() {
    console.log(yellow('connected to MongoDB'));
  }
}
