import { Module } from '@nestjs/common';
import { LocationService } from './services/location.service';
import { MongooseModule } from '@nestjs/mongoose';
import { countySchema } from './schemas/county-schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'County', schema: countySchema }])],
  providers: [LocationService],
})
export class LocationsModule {
}
