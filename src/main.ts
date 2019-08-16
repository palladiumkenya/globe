import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';
import { SeederModule } from './infrastructure/seeder';
import { log } from 'util';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const microservice = app.connectMicroservice({
    transport: Transport.RMQ,
    options: {
      urls: [`amqp://192.168.104.3:5672/spot`],
      queue: 'stats_queue',
      queueOptions: { durable: true },
    },
  });
  app.enableCors();
  const seeder = app.get(SeederModule);
  await seeder.seedData();
  await app.listen(3001);
  await app.startAllMicroservicesAsync().catch(e => Logger.error(e));
}

bootstrap();
