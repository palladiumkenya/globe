import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { MechanismDto } from '../../../domain/practices/dtos/mechanism.dto';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { SaveMechanismCommand } from '../commands/save-mechanism.command';
import { GetLocationsQuery } from '../../locations/queries/get-locations.query';
import { GetMechanismsQuery } from '../queries/get-mechanisms.query';
import { DeleteMechanismCommand } from '../commands/delete-mechanism.command';

@Controller('mechanisms')
export class MechanismsController {
  constructor(private readonly commandBus: CommandBus,
              private readonly queryBus: QueryBus) {
  }

  @Get()
  async getMechanisms(): Promise<any> {
    return this.queryBus.execute(
      new GetMechanismsQuery(),
    );
  }

  @Post()
  async createOrUpdateMechanism(@Body() mechanism: MechanismDto) {
    return this.commandBus.execute(
      new SaveMechanismCommand(mechanism.code, mechanism.name, mechanism.implementationName, mechanism.agencyId, mechanism._id),
    );
  }

  @Delete(':_id')
  async deleteMechanism(@Param('id') id) {
    return this.commandBus.execute(
      new DeleteMechanismCommand(id),
    );
  }

}
