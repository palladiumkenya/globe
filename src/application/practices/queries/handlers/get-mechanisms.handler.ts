import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetMechanismsQuery } from '../get-mechanisms.query';
import { MechanismDto } from '../../../../domain/practices/dtos/mechanism.dto';
import { MechanismRepository } from '../../../../infrastructure/practices/mechanism.repository';
import { deserializeArray, plainToClass } from 'class-transformer';
import { Mechanism } from '../../../../domain/practices/mechanism';

@QueryHandler(GetMechanismsQuery)
export class GetMechanismsHandler implements IQueryHandler<GetMechanismsQuery, MechanismDto[]> {
  constructor(private readonly mechanismRepository: MechanismRepository) {
  }

  async execute(query: GetMechanismsQuery): Promise<any> {
    const results = await this.mechanismRepository.getAll();
    return results;
  }
}
