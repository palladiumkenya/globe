import { BaseRepository } from '../common/base.repository';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Facility } from '../../domain/practices/facility';

export class FacilityRepository extends BaseRepository<Facility> {

  constructor(@InjectModel(Facility.name)model: Model<Facility>) {
    super(model);
  }
}
