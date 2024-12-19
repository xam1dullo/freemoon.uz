import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
    }),
  );

  // Swagger konfiguratsiyasi
  const config = new DocumentBuilder()
    .setTitle('Free Moon API')
    .setDescription('Loyihangiz uchun API hujjatlari')
    .setVersion('1.0')
    .addTag('API')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document); // Swagger `/api-docs` da mavjud bo'ladi

  await app.listen(process.env.PORT ?? 4000);
}
bootstrap();
