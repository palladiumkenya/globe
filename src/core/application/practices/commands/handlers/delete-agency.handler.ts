import { SaveAgencyCommand } from '../save-agency.command';
import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { Agency } from '../../../../domain/practices/agency';
import { AgencyRepository } from '../../../../../infrastructure/practices/agency.repository';
import { plainToClass } from 'class-transformer';
import { DeleteAgencyCommand } from '../delete-agency.command';
import { AgencyDeletedEvent } from '../../events/agency-deleted.event';

@CommandHandler(DeleteAgencyCommand)
export class DeleteAgencyHandler implements ICommandHandler<DeleteAgencyCommand> {
  constructor(
    private readonly agencyRepository: AgencyRepository,
    private readonly eventBus: EventBus) {
  }

  async execute(command: DeleteAgencyCommand): Promise<boolean> {
    const result = await this.agencyRepository.delete(command.id);
    if (result) {
      this.eventBus.publish(new AgencyDeletedEvent(command.id));
      return true;
    }
    return false;
  }
}
