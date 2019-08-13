import { BaseRepository } from '../common/base.repository';
import { County } from '../../domain/locations/county';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

export class LocationRepository extends BaseRepository<County> {

  constructor(@InjectModel(County.name)model: Model<County>) {
    super(model);
  }
}
