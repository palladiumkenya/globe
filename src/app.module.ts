import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { LocationsController } from './core/application/locations/controllers/locations.controller';
import { LocationService } from './core/application/locations/services/location.service';
import { LocationsModule } from './core/application/locations/locations.module';
import { MongooseModule } from '@nestjs/mongoose';
import { PracticesController } from './core/application/practices/controllers/practices.controller';
import { PracticesModule } from './core/application/practices/practices.module';
import { CqrsModule } from '@nestjs/cqrs';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/dwapiGlobe', { useNewUrlParser: true }), LocationsModule, PracticesModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {
}
