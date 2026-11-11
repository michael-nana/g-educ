
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import compression from 'compression';
import helmet from 'helmet';

import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { SerializationInterceptor } from './common/interceptors/serialization.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // CORS : autoriser le frontend G-EDUC
  const corsOrigins = [
    ...(process.env.CORS_ORIGINS
      ?.split(',')
      .map((origin) => origin.trim())
      .filter(Boolean) ?? []),
    'http://localhost:5173',
    'http://127.0.0.1:5173',
  ];

  app.enableCors({
    origin: [...new Set(corsOrigins)],
    methods: [
      'GET',
      'HEAD',
      'POST',
      'PUT',
      'PATCH',
      'DELETE',
      'OPTIONS',
    ],
    allowedHeaders: [
      'Content-Type',
      'Authorization',
    ],
    credentials: true,
  });

  // Préfixe global de l'API
  app.setGlobalPrefix('api/v1');

  // Validation globale
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // Gestion globale des erreurs
  app.useGlobalFilters(new HttpExceptionFilter());

  // Intercepteur global
  app.useGlobalInterceptors(new SerializationInterceptor());

  // Middlewares
  app.use(compression());
  app.use(helmet());

  // Documentation Swagger
  const config = new DocumentBuilder()
    .setTitle('G-Educ API')
    .setDescription('API backend de la plateforme G-Educ')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  // Démarrage du serveur
  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
