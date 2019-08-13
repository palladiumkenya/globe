import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { LocationsModule } from './application/locations/locations.module';
import { MongooseModule } from '@nestjs/mongoose';
import { PracticesModule } from './application/practices/practices.module';
import { SeederModule } from './infrastructure/seeder/seeder.module';
import { CqrsModule } from '@nestjs/cqrs';

const cloudUrl = `mongodb+srv://livetest:maun@cluster0-v6fcj.mongodb.net/dwapiGlobe?retryWrites=true&w=majority`;
const localUrl = 'mongodb://localhost/dwapiGlobe';

@Module({
  imports: [
    CqrsModule,
    MongooseModule.forRoot(cloudUrl, {
      useNewUrlParser: true,
      useFindAndModify: false,
      useCreateIndex: true,
    }), LocationsModule, PracticesModule, SeederModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {
}
