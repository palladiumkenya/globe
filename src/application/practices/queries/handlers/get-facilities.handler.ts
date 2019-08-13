import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetFacilitiesQuery } from '../get-facilities.query';
import { FacilityDto } from '../../../../domain/practices/dtos/facility.dto';
import { FacilityRepository } from '../../../../infrastructure/practices/facility.repository';
import { deserializeArray, plainToClass } from 'class-transformer';
import { Facility } from '../../../../domain/practices/facility';

@QueryHandler(GetFacilitiesQuery)
export class GetFacilitiesHandler implements IQueryHandler<GetFacilitiesQuery, FacilityDto[]> {
  constructor(private readonly facilityRepository: FacilityRepository) {
  }

  async execute(query: GetFacilitiesQuery): Promise<any> {
    const results = await this.facilityRepository.getAll();
    return results;
  }
}
