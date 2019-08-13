import { BaseRepository } from '../common/base.repository';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Mechanism } from '../../domain/practices/mechanism';
import { IMechanismRepository } from '../../domain/practices/mechanism-repository.interface';

export class MechanismRepository extends BaseRepository<Mechanism> implements IMechanismRepository {

  constructor(@InjectModel(Mechanism.name)model: Model<Mechanism>) {
    super(model);
  }
}
