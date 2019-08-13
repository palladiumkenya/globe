import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { LocationsModule } from './application/locations/locations.module';
import { MongooseModule } from '@nestjs/mongoose';
import { PracticesModule } from './application/practices/practices.module';
import { SeederModule } from './infrastructure/seeder/seeder.module';
import { CqrsModule } from '@nestjs/cqrs';

@Module({
  imports: [
    CqrsModule,
    MongooseModule.forRoot('mongodb://localhost/dwapiGlobe', {
      useNewUrlParser: true,
      useFindAndModify: false,
      useCreateIndex: true,
    }), LocationsModule, PracticesModule, SeederModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {
}
