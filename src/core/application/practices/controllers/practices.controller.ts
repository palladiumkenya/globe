import { Body, Controller, Post } from '@nestjs/common';
import { AgencyDto } from '../../../domain/practices/dtos/agency.dto';
import { CommandBus } from '@nestjs/cqrs';
import { SaveAgencyCommand } from '../commands/save-agency.command';

@Controller('practices')
export class PracticesController {
  constructor(private readonly commandBus: CommandBus) {
  }

  @Post()
  async createOrUpdateAgency(@Body() agency: AgencyDto) {
    return this.commandBus.execute(
      new SaveAgencyCommand(agency.name, agency.display, agency.id),
    );
  }
}
