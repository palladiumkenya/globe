import { Test, TestingModule } from '@nestjs/testing';
import { LocationService } from '../../../locations/services/location.service';
import { MongooseModule } from '@nestjs/mongoose';
import { countySchema } from '../../../locations/schemas/county-schema';
import { agencySchema } from '../../schemas/agency-schema';
import { SaveAgencyCommand } from '../save-agency.command';
import { v1 } from 'uuid/v1';
import { CqrsModule, CommandBus, EventBus, EventPublisher, EventsHandler, IEventHandler, ICommandHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';
import { SaveAgencyHandler } from './save-agency.handler';
import { PracticesModule } from '../../practices.module';
import { Agency } from '../../../../domain/practices/agency';
import { Model } from 'mongoose';
import { AgencyCreatedEvent } from '../../events/agency-created.event';
import { AgencyCreatedEventHandler } from '../../events/handlers/agency-created.handler';
import { symlink } from 'fs';
import { Type } from '@nestjs/common';

describe('Save Agency', () => {
  const url = `mongodb+srv://livetest:maun@cluster0-v6fcj.mongodb.net/dwapiGlobeTest?retryWrites=true&w=majority`;
  let module: TestingModule;
  let commandBus: CommandBus;
  jest.setTimeout(10000);

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot(url, { useNewUrlParser: true }),
        PracticesModule,
      ],
    }).compile();

    const saveAgencyHandler = module.get<SaveAgencyHandler>(SaveAgencyHandler);

    commandBus = module.get<CommandBus>(CommandBus);
    commandBus.bind(saveAgencyHandler, 'SaveAgencyCommand');
  });

  /*
    beforeEach(async () => {

    });
  */

  it('should save new Agency', async () => {
    const command = new SaveAgencyCommand('Demo', 'Demo');
    const result = await commandBus.execute(command);
    expect(result).not.toBeNull();
    Logger.debug(result);
  });
});
