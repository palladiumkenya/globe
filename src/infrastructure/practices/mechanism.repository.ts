import { BaseRepository } from '../common/base.repository';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Mechanism } from '../../domain/practices/mechanism';
import { IMechanismRepository } from '../../domain/practices/mechanism-repository.interface';
import { MechanismDto } from '../../domain/practices/dtos/mechanism.dto';
import { Agency } from '../../domain/practices/agency';

export class MechanismRepository extends BaseRepository<Mechanism> implements IMechanismRepository {

  constructor(@InjectModel(Mechanism.name)model: Model<Mechanism>) {
    super(model);
  }

  async getMechanisms(agencyId?: string): Promise<any[]> {
    let results = [];
    if (agencyId) {
      results = await this.model.find({ agency: agencyId }).populate(Agency.name.toLowerCase()).exec();
    } else {
      results = await this.model.find().populate(Agency.name.toLowerCase()).exec();
    }
    return results;
  }
}
