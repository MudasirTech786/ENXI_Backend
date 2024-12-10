import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  // Retrieve the port from the .env file
  const port = configService.get<number>('PORT', 3000); // Default to 3000 if not found

  console.log('JWT_SECRET:', configService.get<string>('JWT_SECRET')); // Debug log

  app.useGlobalPipes(new ValidationPipe());
  await app.listen(port);
  console.log(`Application is running on http://localhost:${port}`);
}
bootstrap();
