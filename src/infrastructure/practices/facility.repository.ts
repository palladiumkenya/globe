import { BaseRepository } from '../common/base.repository';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Facility } from '../../domain/practices/facility';
import { IFacilityRepository } from '../../domain/practices/facility-repository.interface';

export class FacilityRepository extends BaseRepository<Facility> implements IFacilityRepository {

  constructor(@InjectModel(Facility.name)model: Model<Facility>) {
    super(model);
  }
}
