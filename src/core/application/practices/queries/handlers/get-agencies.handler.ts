import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetAgenciesQuery } from '../get-agencies.query';
import { AgencyDto } from '../../../../domain/practices/dtos/agency.dto';
import { AgencyRepository } from '../../../../../infrastructure/practices/agency.repository';
import { deserializeArray, plainToClass } from 'class-transformer';
import { Agency } from '../../../../domain/practices/agency';

@QueryHandler(GetAgenciesQuery)
export class GetAgenciesHandler implements IQueryHandler<GetAgenciesQuery, AgencyDto[]> {
  constructor(private readonly agencyRepository: AgencyRepository) {
  }

  async execute(query: GetAgenciesQuery): Promise<AgencyDto[]> {
    const results = await this.agencyRepository.getAll();
    return results;
  }
}
