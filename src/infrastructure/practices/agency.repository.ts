import { BaseRepository } from '../common/base.repository';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Agency } from '../../domain/practices/agency';

export class AgencyRepository extends BaseRepository<Agency> {

  constructor(@InjectModel(Agency.name)model: Model<Agency>) {
    super(model);
  }
}
