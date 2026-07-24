// src/main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Habilitamos CORS para que nuestro NextJS pueda consultar la API libremente
  app.enableCors();

  await app.listen(3000); // Se ejecutará en http://localhost:3000
}
bootstrap();