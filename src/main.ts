import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
     whitelist: true,
     forbidNonWhitelisted: true,
     forbidUnknownValues: true
    })
   );
  app.enableCors({
    origin: true, // Set this to your frontend URL if needed
    credentials: true, // Allow credentials (cookies)
  });
  await app.listen(3001);
}
bootstrap();
