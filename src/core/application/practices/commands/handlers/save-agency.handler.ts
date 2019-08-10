import { SaveAgencyCommand } from '../save-agency.command';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { Agency } from '../../../../domain/practices/agency';
import { AgencyRepository } from '../../../../../infrastructure/practices/agency.repository';
import { plainToClass } from 'class-transformer';

@CommandHandler(SaveAgencyCommand)
export class SaveAgencyHandler implements ICommandHandler<SaveAgencyCommand> {
  constructor(
    private readonly agencyRepository: AgencyRepository,
    private readonly publisher: EventPublisher) {
  }

  async execute(command: SaveAgencyCommand): Promise<any> {

    if (command.id) {
      return await this.updateAgency(command);
    }

    const newAgency = new Agency(command.name, command.display);
    const agency = await this.agencyRepository.create(newAgency);
    newAgency.commit();
    return agency;
  }

  async updateAgency(command: SaveAgencyCommand): Promise<any> {
    const raw = await this.agencyRepository.get(command.id);
    if (raw) {
      const agencyToUpdate = plainToClass(Agency, raw);
      agencyToUpdate.changeDetails(command.name, command.display);
      const agency = await this.agencyRepository.update(agencyToUpdate);
      agencyToUpdate.commit();
      return agency;
    }
  }
}
