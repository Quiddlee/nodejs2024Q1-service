import 'dotenv/config';

import { NestFactory } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';
import { SWAGGER_CONFIG } from './lib/const/const';

const PORT = Number(process.env.PORT);

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const document = SwaggerModule.createDocument(app, SWAGGER_CONFIG);
  SwaggerModule.setup('api', app, document);

  await app.listen(PORT);
}

void bootstrap();
