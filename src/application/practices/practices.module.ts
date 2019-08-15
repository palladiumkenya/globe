import { Module } from '@nestjs/common';
import { SaveAgencyHandler } from './commands/handlers/save-agency.handler';
import { AgenciesController } from './controllers/agencies.controller';
import { CqrsModule } from '@nestjs/cqrs';
import { AgencyCreatedEventHandler } from './events/handlers/agency-created.handler';
import { GetAgenciesHandler } from './queries/handlers/get-agencies.handler';
import { AgencyDeletedEventHandler } from './events/handlers/agency-deleted.handler';
import { AgencyUpdatedEventHandler } from './events/handlers/agency-updated.handler';
import { DeleteAgencyHandler } from './commands/handlers/delete-agency.handler';
import { PracticesInfrastructureModule } from '../../infrastructure/practices/practices.infrastructure.module';
import { SaveFacilityHandler } from './commands/handlers/save-facility.handler';
import { DeleteFacilityHandler } from './commands/handlers/delete-facility.handler';
import { SaveMechanismHandler } from './commands/handlers/save-mechanism.handler';
import { DeleteMechanismHandler } from './commands/handlers/delete-mechanism.handler';
import { FacilityDeletedEventHandler } from './events/handlers/facility-deleted.handler';
import { FacilityUpdatedEventHandler } from './events/handlers/facility-updated.handler';
import { MechanismCreatedEventHandler } from './events/handlers/mechanism-created.handler';
import { MechanismDeletedEventHandler } from './events/handlers/mechanism-deleted.handler';
import { MechanismUpdatedEventHandler } from './events/handlers/mechanism-updated.handler';
import { GetMechanismsHandler } from './queries/handlers/get-mechanisms.handler';
import { GetFacilitiesHandler } from './queries/handlers/get-facilities.handler';
import { FacilityCreatedEventHandler } from './events/handlers/facility-created.handler';
import { FacilitiesController } from './controllers/facilities.controller';
import { MechanismsController } from './controllers/mechanisms.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    CqrsModule,
    ClientsModule.register([{
      name: 'GLOBE_SERVICE',
      transport: Transport.REDIS,
      options: {
        url: 'redis://localhost:6379',
      },
    }]),
    PracticesInfrastructureModule,
  ],
  controllers: [AgenciesController, FacilitiesController, MechanismsController],
  providers: [
    SaveAgencyHandler, DeleteAgencyHandler,
    SaveFacilityHandler, DeleteFacilityHandler,
    SaveMechanismHandler, DeleteMechanismHandler,
    GetAgenciesHandler, GetMechanismsHandler, GetFacilitiesHandler,
    AgencyCreatedEventHandler, AgencyDeletedEventHandler, AgencyUpdatedEventHandler,
    FacilityCreatedEventHandler, FacilityDeletedEventHandler, FacilityUpdatedEventHandler,
    MechanismCreatedEventHandler, MechanismDeletedEventHandler, MechanismUpdatedEventHandler],
})
export class PracticesModule {

}
