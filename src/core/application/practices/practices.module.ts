import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { agencySchema } from './schemas/agency-schema';
import { SaveAgencyCommand } from './commands/save-agency.command';
import { SaveAgencyHandler } from './commands/handlers/save-agency.handler';
import { PracticesController } from './controllers/practices.controller';
import { CqrsModule } from '@nestjs/cqrs';
import { AgencyCreatedEventHandler } from './events/handlers/agency-created.handler';
import { GetAgenciesQuery } from './queries/get-agencies.query';
import { GetAgenciesHandler } from './queries/handlers/get-agencies.handler';
import { AgencyRepository } from '../../../infrastructure/practices/agency.repository';

@Module({
  imports: [
    CqrsModule,
    MongooseModule.forFeature([{ name: 'Agency', schema: agencySchema }]),
  ],
  controllers: [PracticesController],
  providers: [AgencyRepository, SaveAgencyHandler, AgencyCreatedEventHandler, GetAgenciesHandler],
})
export class PracticesModule {

}
