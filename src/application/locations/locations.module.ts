import { Module } from '@nestjs/common';
import { LocationsController } from './controllers/locations.controller';
import { GetLocationsHandler } from './queries/handlers/get-locations.handler';
import { CqrsModule } from '@nestjs/cqrs';
import { LocationsInfrastructureModule } from '../../infrastructure/locations/locations.infrastructure.module';

@Module({
  imports: [
    CqrsModule,
    LocationsInfrastructureModule,
  ],
  controllers: [LocationsController],
  providers: [GetLocationsHandler],
})
export class LocationsModule {
}
