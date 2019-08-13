import { Injectable, Logger } from '@nestjs/common';
import { SeedReader } from '../common/seed-reader';
import { deserializeArray } from 'class-transformer';
import { AgencyRepository } from './agency.repository';
import { Agency } from '../../domain/practices/agency';
import { MechanismRepository } from './mechanism.repository';
import { FacilityRepository } from './facility.repository';

@Injectable()
export class PracticeSeeder {

  constructor(private readonly reader: SeedReader,
              private readonly agencyRepository: AgencyRepository,
              private readonly mechanismRepository: MechanismRepository,
              private readonly facilityRepository: FacilityRepository) {
  }

  async loadAgencies(): Promise<Agency[]> {
    const seedData = await this.reader.read('agency');
    const agencies = deserializeArray(Agency, seedData);
    return agencies;
  }

  async loadFacilities(): Promise<Agency[]> {
    const seedData = await this.reader.read('agency');
    const agencies = deserializeArray(Agency, seedData);
    return agencies;
  }

  async loadMechanisms(): Promise<Agency[]> {
    const seedData = await this.reader.read('agency');
    const agencies = deserializeArray(Agency, seedData);
    return agencies;
  }

  async seed(): Promise<number> {

    const agencies = await this.loadAgencies();
    const mechanisms = await this.loadMechanisms();
    const facilities = await this.loadFacilities();

    const ggenciesCount = await this.agencyRepository.getCount();
    if (ggenciesCount === 0) {
      Logger.log(`Seeding Agencies..`);
      await this.agencyRepository.createBatch(agencies);
    }

    const mechanismsCount = await this.mechanismRepository.getCount();
    if (mechanismsCount === 0) {
      Logger.log(`Seeding Agencies..`);
      await this.agencyRepository.createBatch(mechanisms);
    }

    const facilitiesCount = await this.facilityRepository.getCount();
    if (facilitiesCount === 0) {
      Logger.log(`Seeding Facilities..`);
      await this.agencyRepository.createBatch(facilities);
    }
    return 0;
  }

}
