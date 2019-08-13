import { SaveMechanismCommand } from '../save-mechanism.command';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { Mechanism } from '../../../../domain/practices/mechanism';
import { MechanismRepository } from '../../../../infrastructure/practices/mechanism.repository';
import { plainToClass } from 'class-transformer';

@CommandHandler(SaveMechanismCommand)
export class SaveMechanismHandler implements ICommandHandler<SaveMechanismCommand> {
  constructor(
    private readonly mechanismRepository: MechanismRepository,
    private readonly publisher: EventPublisher) {
  }

  async execute(command: SaveMechanismCommand): Promise<any> {

    if (command._id && command._id !== '00000000-0000-0000-0000-000000000000') {
      return await this.updateMechanism(command);
    }

    return await this.createMechanism(command);
  }

  async createMechanism(command: SaveMechanismCommand): Promise<any> {
    const newMechanism = new Mechanism(command.code, command.name, command.implementationName);
    const mechanism = await this.mechanismRepository.create(newMechanism);
    this.publisher.mergeObjectContext(newMechanism).commit();
    return mechanism;
  }

  async updateMechanism(command: SaveMechanismCommand): Promise<any> {
    const raw = await this.mechanismRepository.get(command._id);
    if (raw) {
      const mechanismToUpdate = plainToClass(Mechanism, raw);
      mechanismToUpdate.changeDetails(command.code, command.name, command.implementationName);
      const mechanism = await this.mechanismRepository.update(mechanismToUpdate);
      this.publisher.mergeObjectContext(mechanismToUpdate).commit();
      return mechanism;
    }
  }
}
