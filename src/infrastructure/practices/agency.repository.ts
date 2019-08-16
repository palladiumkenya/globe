import { BaseRepository } from '../common/base.repository';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Agency, IAgencyRepository } from '../../domain/practices';

export class AgencyRepository extends BaseRepository<Agency>
  implements IAgencyRepository {
  constructor(@InjectModel(Agency.name) model: Model<Agency>) {
    super(model);
  }
}
