import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { LocationsController } from './core/application/locations/controllers/locations.controller';
import { LocationService } from './core/application/locations/services/location.service';
import { LocationsModule } from './core/application/locations/locations.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost/dwapiGlobe', { useNewUrlParser: true }), LocationsModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {
}
