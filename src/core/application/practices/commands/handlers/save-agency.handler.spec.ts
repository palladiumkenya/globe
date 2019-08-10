import { Test, TestingModule } from '@nestjs/testing';
import { MongooseModule } from '@nestjs/mongoose';
import { SaveAgencyCommand } from '../save-agency.command';
import { CommandBus, CqrsModule } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';
import { SaveAgencyHandler } from './save-agency.handler';
import { PracticesModule } from '../../practices.module';
import { TestDbHelper } from '../../../../../infrastructure/common/test-db.helper';
import { agencySchema } from '../../schemas/agency-schema';
import { getTestAgencies } from '../../../../../infrastructure/common/test.data';
import { Agency } from '../../../../domain/practices/agency';

describe('Save Agency Command Tests', () => {
  let module: TestingModule;
  let commandBus: CommandBus;
  let testAgencies: Agency[] = [];
  const dbHelper = new TestDbHelper();

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot(dbHelper.url, dbHelper.options),
        MongooseModule.forFeature([{ name: 'Agency', schema: agencySchema }]),
        PracticesModule,
      ],
    }).compile();
    testAgencies = getTestAgencies(5);
    await dbHelper.initConnection();
    await dbHelper.seedDb('agencies', testAgencies);

    const saveAgencyHandler = module.get<SaveAgencyHandler>(SaveAgencyHandler);

    commandBus = module.get<CommandBus>(CommandBus);
    commandBus.bind(saveAgencyHandler, SaveAgencyCommand.name);
  });

  afterAll(async () => {
    await dbHelper.clearDb();
    await dbHelper.closeConnection();
  });

  it('should create Agency', async () => {
    const command = new SaveAgencyCommand('Demo', 'Demo');
    const result = await commandBus.execute(command);
    expect(result).not.toBeNull();
    Logger.debug(result);
  });

  it('should modify Agency', async () => {
    const command = new SaveAgencyCommand('NewTest', 'NewTest', testAgencies[0].id);
    const result = await commandBus.execute(command);
    expect(result.name).toBe('NewTest');
    expect(result.display).toBe('NewTest');
    expect(result.id).toBe(testAgencies[0].id);
    Logger.debug(result);
  });

});
