import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { FacilityDto } from '../../../domain/practices/dtos/facility.dto';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { SaveFacilityCommand } from '../commands/save-facility.command';
import { GetLocationsQuery } from '../../locations/queries/get-locations.query';
import { GetFacilitiesQuery } from '../queries/get-facilities.query';
import { DeleteFacilityCommand } from '../commands/delete-facility.command';

@Controller('facilities')
export class FacilitiesController {
  constructor(private readonly commandBus: CommandBus,
              private readonly queryBus: QueryBus) {
  }

  @Get()
  async getFacilities(): Promise<any> {
    return this.queryBus.execute(
      new GetFacilitiesQuery(),
    );
  }

  @Post()
  async createOrUpdateFacility(@Body() facility: FacilityDto) {
    return this.commandBus.execute(
      new SaveFacilityCommand(facility.code, facility.name, facility.id),
    );
  }

  @Delete(':id')
  async deleteFacility(@Param('id') id) {
    return this.commandBus.execute(
      new DeleteFacilityCommand(id),
    );
  }


}
