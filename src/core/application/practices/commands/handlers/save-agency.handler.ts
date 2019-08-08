import { SaveAgencyCommand } from '../save-agency.command';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Agency } from '../../../../domain/practices/agency';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@CommandHandler(SaveAgencyCommand)
export class SaveAgencyHandler implements ICommandHandler<SaveAgencyCommand> {

  constructor(
    @InjectModel('Agency')
    private readonly model: Model<Agency>) {
  }

  async execute(command: SaveAgencyCommand): Promise<any> {
    if (command.id) {
      const agency = await this.model.findById(command.id);
      if (agency) {
        agency.changeDetails(command.name, command.display);
      }
      return  agency.save();
    } else {
      const newAgency = new Agency(command.name, command.display);
      return this.model(newAgency).save();
    }
  }
}
