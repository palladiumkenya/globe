import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { countySchema } from '../../infrastructure/locations/schemas/county.schema';
import { LocationsController } from './controllers/locations.controller';
import { LocationRepository } from '../../infrastructure/locations/location.repository';
import { GetLocationsHandler } from './queries/handlers/get-locations.handler';
import { CqrsModule } from '@nestjs/cqrs';

@Module({
  imports: [
    CqrsModule,
    MongooseModule.forFeature([{ name: 'County', schema: countySchema }]),
  ],
  controllers: [LocationsController],
  providers: [LocationRepository, GetLocationsHandler],
})
export class LocationsModule {
}
