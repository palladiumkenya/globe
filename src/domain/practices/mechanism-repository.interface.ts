import { Mechanism } from '../../domain/practices/mechanism';
import { IRepository } from '../../application/common/repository.interface';
import { MechanismDto } from './dtos/mechanism.dto';

export interface IMechanismRepository extends IRepository<Mechanism> {
  getMechanisms(agencyId?: string): Promise<any[]>;
}
