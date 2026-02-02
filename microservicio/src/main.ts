import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Habilitar validación global
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  const port = process.env.PORT || 3002;
  await app.listen(port, '0.0.0.0');

  console.log(`Microservicio corriendo en puerto ${port}`);
}
bootstrap();