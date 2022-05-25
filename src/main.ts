import { NestFactory } from '@nestjs/core';
import { Logger } from 'nestjs-pino';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    abortOnError: false,
    bufferLogs: true, // Wait for logger before starting app
  });
  app.useLogger(app.get(Logger));
  await app.listen(3000);
}
bootstrap();
