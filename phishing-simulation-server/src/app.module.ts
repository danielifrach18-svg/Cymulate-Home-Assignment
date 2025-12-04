import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { PhishingModule } from './phishing/phishing.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseDBModule } from './db/mongooseDb.module';
import { LoggerMiddleware } from './common/middleware/logger.middleware';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
    MongooseDBModule,
    PhishingModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
