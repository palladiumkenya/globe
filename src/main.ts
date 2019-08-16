import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SeederModule } from './infrastructure/seeder/seeder.module';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  /*const microservice = app.connectMicroservice({
    transport: Transport.RMQ,
    options: {
      urls: [`amqp://localhost:5672`],
      queue: 'cats_queue',
      queueOptions: { durable: true },
    },
  });*/
  app.enableCors();
  const seeder = app.get(SeederModule);
  await seeder.seedData();
 // await app.startAllMicroservicesAsync();
  await app.listen(3001);
}

bootstrap();
