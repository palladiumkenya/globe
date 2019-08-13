import { BaseRepository } from '../common/base.repository';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Mechanism } from '../../domain/practices/mechanism';

export class MechanismRepository extends BaseRepository<Mechanism> {

  constructor(@InjectModel(Mechanism.name)model: Model<Mechanism>) {
    super(model);
  }
}
