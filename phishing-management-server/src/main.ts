import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { blue } from 'chalk';
const PORT = process.env.PORT || 8081;

const bootstrap = async () => {
  const app = await NestFactory.create(AppModule, { cors: true });
  await app.listen(PORT, () => {
    console.log(blue(`🚀 server Listening on PORT: ${PORT}`));
  });
};
bootstrap();
