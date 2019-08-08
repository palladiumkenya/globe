import { Module } from '@nestjs/common';
import { LocationService } from './services/location.service';
import { MongooseModule } from '@nestjs/mongoose';
import { countySchema } from './schemas/county-schema';
import { LocationsController } from './controllers/locations.controller';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'County', schema: countySchema }])],
  controllers: [LocationsController],
  providers: [LocationService],
})
export class LocationsModule {
}
