import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { FacilityRepository } from '../../../../infrastructure/practices/facility.repository';
import { DeleteFacilityCommand } from '../delete-facility.command';
import { FacilityDeletedEvent } from '../../events/facility-deleted.event';

@CommandHandler(DeleteFacilityCommand)
export class DeleteFacilityHandler implements ICommandHandler<DeleteFacilityCommand> {
  constructor(
    private readonly facilityRepository: FacilityRepository,
    private readonly eventBus: EventBus) {
  }

  async execute(command: DeleteFacilityCommand): Promise<boolean> {
    const result = await this.facilityRepository.delete(command.id);
    if (result) {
      this.eventBus.publish(new FacilityDeletedEvent(command.id));
      return true;
    }
    return false;
  }
}
