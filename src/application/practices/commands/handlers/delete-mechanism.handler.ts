import { SaveMechanismCommand } from '../save-mechanism.command';
import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { Mechanism } from '../../../../domain/practices/mechanism';
import { MechanismRepository } from '../../../../infrastructure/practices/mechanism.repository';
import { plainToClass } from 'class-transformer';
import { DeleteMechanismCommand } from '../delete-mechanism.command';
import { MechanismDeletedEvent } from '../../events/mechanism-deleted.event';

@CommandHandler(DeleteMechanismCommand)
export class DeleteMechanismHandler implements ICommandHandler<DeleteMechanismCommand> {
  constructor(
    private readonly mechanismRepository: MechanismRepository,
    private readonly eventBus: EventBus) {
  }

  async execute(command: DeleteMechanismCommand): Promise<boolean> {
    const result = await this.mechanismRepository.delete(command._id);
    if (result) {
      this.eventBus.publish(new MechanismDeletedEvent(command._id));
      return true;
    }
    return false;
  }
}
