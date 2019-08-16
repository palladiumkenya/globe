import { Module } from '@nestjs/common';
import { LocationsController } from './controllers/locations.controller';
import { GetLocationsHandler } from './queries/handlers/get-locations.handler';
import { CqrsModule } from '@nestjs/cqrs';
import { LocationsInfrastructureModule } from '../../infrastructure/locations/locations.infrastructure.module';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    CqrsModule,
    ClientsModule.register([{
      name: 'GLOBE_SERVICE',
      transport: Transport.RMQ,
      options: {
        urls: [`amqp://localhost:5672`],
        queue: 'cats_queue',
        queueOptions: { durable: true },
      },
    }]),
    LocationsInfrastructureModule,
  ],
  controllers: [LocationsController],
  providers: [GetLocationsHandler],
})
export class LocationsModule {
}
