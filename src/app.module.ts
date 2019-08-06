import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { LocationsController } from './controllers/locations.controller';
import { LocationService } from './core/application/locations/services/location.service';

@Module({
  imports: [],
  controllers: [AppController, LocationsController],
  providers: [LocationService],
})
export class AppModule {
}
