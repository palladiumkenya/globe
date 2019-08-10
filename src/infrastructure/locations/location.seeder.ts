import { Injectable, Logger } from '@nestjs/common';
import { SeedReader } from '../common/seed-reader';
import { deserializeArray } from 'class-transformer';
import { County } from '../../core/domain/locations/county';
import { LocationRepository } from './location.repository';

@Injectable()
export class LocationSeeder {

  constructor(private readonly reader: SeedReader,
              private readonly locationRepository: LocationRepository) {
  }

  async load(): Promise<County[]> {
    const seedData = await this.reader.read('county');
    const counties = deserializeArray(County, seedData);
    return counties;
  }

  async seed(): Promise<number> {
    const seedData = await this.load();
    const count = await this.locationRepository.getCount();
    if (count === 0) {
      Logger.log(`Seeding Counties..`);
      await this.locationRepository.createBatch(seedData);
      return seedData.length;
    }
    return 0;

  }

}
