import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetLocationsQuery } from '../get-locations.query';
import { CountyDto } from '../../../../domain/locations/dtos/county.dto';
import { LocationRepository } from '../../../../infrastructure/locations/location.repository';

@QueryHandler(GetLocationsQuery)
export class GetLocationsHandler implements IQueryHandler<GetLocationsQuery, CountyDto[]> {
  constructor(private readonly repository: LocationRepository) {
  }

  async execute(query: GetLocationsQuery): Promise<CountyDto[]> {
    return await this.repository.getAll();
  }
}
