import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import * as morgan from 'morgan';
import { CORS } from './constants';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //Logger
  app.use(morgan('dev'));
  //ConfigService
  const configService = app.get(ConfigService);
  //PORT
  const port = configService.get('PORT');

  //Global Prefix
  app.setGlobalPrefix('api');
  //Enable Cors
  app.enableCors(CORS);
  //Start Server
  await app.listen(port);

  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
