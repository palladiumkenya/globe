import { BaseRepository } from '../common/base.repository';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Facility } from '../../domain/practices/facility';
import { IFacilityRepository } from '../../domain/practices/facility-repository.interface';
import { Agency } from '../../domain/practices/agency';
import { Mechanism } from '../../domain/practices/mechanism';

export class FacilityRepository extends BaseRepository<Facility> implements IFacilityRepository {

  constructor(@InjectModel(Facility.name)model: Model<Facility>) {
    super(model);
  }

  async getFacilities(mechanismId?: string): Promise<any[]> {
    let results = [];
    if (mechanismId) {
      results = await this.model.find({ mechanism: mechanismId }).populate(Mechanism.name.toLowerCase()).exec();
    } else {
      results = await this.model.find().populate(Mechanism.name.toLowerCase()).exec();
    }
    return results;
  }
}
