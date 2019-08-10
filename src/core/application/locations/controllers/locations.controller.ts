import { Controller, Get } from '@nestjs/common';
import { IQueryResult, QueryBus } from '@nestjs/cqrs';
import { CountyDto } from '../../../domain/locations/dtos/county.dto';
import { GetLocationsQuery } from '../queries/get-locations.query';

@Controller('locations')
export class LocationsController {
  constructor(
    private readonly queryBus: QueryBus,
  ) {
  }

  @Get()
  async getCounties(): Promise<any> {
    return this.queryBus.execute(
      new GetLocationsQuery(),
    );
  }
}
