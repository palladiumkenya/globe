import { SaveAgencyCommand } from '../save-agency.command';
import { CommandHandler, EventBus, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { Agency } from '../../../../domain/practices/agency';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@CommandHandler(SaveAgencyCommand)
export class SaveAgencyHandler implements ICommandHandler<SaveAgencyCommand> {
  constructor(
    @InjectModel('Agency')
    private readonly model: Model<Agency>,
    private readonly publisher: EventPublisher) {
  }

  async execute(command: SaveAgencyCommand): Promise<any> {
    const newAgency = new Agency(command.name, command.display);
    const hero = this.publisher.mergeObjectContext(newAgency);
    const result = this.model(newAgency).save();
    hero.commit();
    return result;
  }
}
