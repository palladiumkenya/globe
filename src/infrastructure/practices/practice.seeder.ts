import { Injectable, Logger } from '@nestjs/common';
import { SeedReader } from '../common/seed-reader';
import { deserializeArray } from 'class-transformer';
import { AgencyRepository } from './agency.repository';
import { Agency } from '../../core/domain/practices/agency';

@Injectable()
export class PracticeSeeder {

  constructor(private readonly reader: SeedReader,
              private readonly agencyRepository: AgencyRepository) {
  }

  async load(): Promise<Agency[]> {
    const seedData = await this.reader.read('agency');
    const agencies = deserializeArray(Agency, seedData);
    return agencies;
  }

  async seed(): Promise<number> {
    const seedData = await this.load();
    const count = await this.agencyRepository.getCount();
    if (count === 0) {
      Logger.log(`Seeding Agencies..`);
      await this.agencyRepository.createBatch(seedData);
      return seedData.length;
    }
    return 0;

  }

}
