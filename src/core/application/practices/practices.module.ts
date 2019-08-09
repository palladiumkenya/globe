import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { countySchema } from '../locations/schemas/county-schema';
import { LocationsController } from '../locations/controllers/locations.controller';
import { LocationService } from '../locations/services/location.service';
import { agencySchema } from './schemas/agency-schema';
import { SaveAgencyCommand } from './commands/save-agency.command';
import { SaveAgencyHandler } from './commands/handlers/save-agency.handler';
import { PracticesController } from './controllers/practices.controller';
import { CqrsModule } from '@nestjs/cqrs';
import { AgencyCreatedEventHandler } from './events/handlers/agency-created.handler';

@Module({
  imports: [
    CqrsModule,
    MongooseModule.forFeature([{ name: 'Agency', schema: agencySchema }]),
  ],
  controllers: [PracticesController],
  providers: [SaveAgencyHandler, AgencyCreatedEventHandler],
})
export class PracticesModule {

}
