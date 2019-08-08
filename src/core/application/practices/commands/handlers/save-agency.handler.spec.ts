import { Test, TestingModule } from '@nestjs/testing';
import { LocationService } from '../../../locations/services/location.service';
import { MongooseModule } from '@nestjs/mongoose';
import { countySchema } from '../../../locations/schemas/county-schema';
import { agencySchema } from '../../schemas/agency-schema';
import { SaveAgencyCommand } from '../save-agency.command';
import { uuidv1 } from 'uuid/v1';
import { CommandBus } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';
import { SaveAgencyHandler } from './save-agency.handler';
import { PracticesModule } from '../../practices.module';
import { Agency } from '../../../../domain/practices/agency';
import { Model } from 'mongoose';

describe('Save Agency', () => {
  const url = `mongodb+srv://livetest:maun@cluster0-v6fcj.mongodb.net/dwapiGlobeTest?retryWrites=true&w=majority`;
  let module: TestingModule;
  let handler: SaveAgencyHandler;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot(url, { useNewUrlParser: true }),
        MongooseModule.forFeature([{ name: 'Agency', schema: agencySchema }]),
      ],
      providers: [SaveAgencyHandler],
    }).compile();
  });

  beforeEach(async () => {

    handler = module.get<SaveAgencyHandler>(SaveAgencyHandler);
  });

  it('should save new Agency', async () => {
    const command = new SaveAgencyCommand('Demo', 'Demo');
    const result = await handler.execute(command);
    expect(result).not.toBeNull();
    Logger.debug(result);
  });
});
