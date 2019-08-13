import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LocationSeeder } from '../seeder/location.seeder';
import { PracticeSeeder } from '../seeder/practice.seeder';
import { AgencyRepository } from '../practices/agency.repository';
import { agencySchema } from '../practices/schemas/agency.schema';
import { FacilityRepository } from '../practices/facility.repository';
import { MechanismRepository } from '../practices/mechanism.repository';
import { Agency } from '../../domain/practices/agency';
import { Mechanism } from '../../domain/practices/mechanism';
import { Facility } from '../../domain/practices/facility';
import { mechanismSchema } from '../practices/schemas/mechanism.schema';
import { facilitySchema } from '../practices/schemas/facility.schema';
import { LocationRepository } from '../locations/location.repository';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Agency.name, schema: agencySchema }]),
    MongooseModule.forFeature([{ name: Mechanism.name, schema: mechanismSchema }]),
    MongooseModule.forFeature([{ name: Facility.name, schema: facilitySchema }]),
  ],
  providers: [
    { provide: 'IAgencyRepository', useClass: AgencyRepository },
    { provide: 'IFacilityRepository', useClass: FacilityRepository },
    { provide: 'IMechanismRepository', useClass: MechanismRepository },
  ],
  exports: [
    { provide: 'IAgencyRepository', useClass: AgencyRepository },
    { provide: 'IFacilityRepository', useClass: FacilityRepository },
    { provide: 'IMechanismRepository', useClass: MechanismRepository },
  ],
})
export class PracticesInfrastructureModule {
}
