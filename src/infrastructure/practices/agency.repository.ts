import { BaseRepository } from '../common/base.repository';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Agency } from '../../domain/practices/agency';
import { IAgencyRepository } from '../../domain/practices/agency-repository.interface';

export class AgencyRepository extends BaseRepository<Agency> implements IAgencyRepository {

  constructor(@InjectModel(Agency.name)model: Model<Agency>) {
    super(model);
  }
}
