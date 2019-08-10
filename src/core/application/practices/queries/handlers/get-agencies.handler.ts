import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetAgenciesQuery } from '../get-agencies.query';
import { AgencyDto } from '../../../../domain/practices/dtos/agency.dto';
import { AgencyRepository } from '../../../../../infrastructure/practices/agency.repository';

@QueryHandler(GetAgenciesQuery)
export class GetAgenciesHandler implements IQueryHandler<GetAgenciesQuery, AgencyDto[]> {
  constructor(private readonly agencyRepository: AgencyRepository) {
  }

  async execute(query: GetAgenciesQuery): Promise<AgencyDto[]> {
    return await this.agencyRepository.getAll();
  }
}
