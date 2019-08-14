import { Facility } from '../../domain/practices/facility';
import { IRepository } from '../../application/common/repository.interface';

export interface IFacilityRepository extends IRepository<Facility> {
  getFacilities(mechanismId?: string): Promise<any[]>;
}
