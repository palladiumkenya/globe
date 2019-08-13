import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { agencySchema } from '../../infrastructure/practices/schemas/agency.schema';
import { SaveAgencyCommand } from './commands/save-agency.command';
import { SaveAgencyHandler } from './commands/handlers/save-agency.handler';
import { AgenciesController } from './controllers/agencies.controller';
import { CqrsModule } from '@nestjs/cqrs';
import { AgencyCreatedEventHandler } from './events/handlers/agency-created.handler';
import { GetAgenciesQuery } from './queries/get-agencies.query';
import { GetAgenciesHandler } from './queries/handlers/get-agencies.handler';
import { AgencyRepository } from '../../infrastructure/practices/agency.repository';
import { AgencyDeletedEventHandler } from './events/handlers/agency-deleted.handler';
import { AgencyUpdatedEventHandler } from './events/handlers/agency-updated.handler';
import { DeleteAgencyHandler } from './commands/handlers/delete-agency.handler';

@Module({
  imports: [
    CqrsModule,
    MongooseModule.forFeature([{ name: 'Agency', schema: agencySchema }]),
  ],
  controllers: [AgenciesController],
  providers: [AgencyRepository, SaveAgencyHandler, DeleteAgencyHandler,
    AgencyCreatedEventHandler, GetAgenciesHandler,
    AgencyDeletedEventHandler, AgencyUpdatedEventHandler],
})
export class PracticesModule {

}
