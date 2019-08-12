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
import { DeleteAgencyCommand } from '../delete-agency.command';
import { DeleteAgencyHandler } from './delete-agency.handler';

describe('Delete Agency Command Tests', () => {
  let module: TestingModule;
  let commandBus: CommandBus;
  let testAgencies: Agency[] = [];
  const dbHelper = new TestDbHelper();
  let liveAgency: Agency;

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

    const deleteHandler = module.get<DeleteAgencyHandler>(DeleteAgencyHandler);

    commandBus = module.get<CommandBus>(CommandBus);
    commandBus.bind(deleteHandler, DeleteAgencyCommand.name);
  });

  afterAll(async () => {
    await dbHelper.clearDb();
    await dbHelper.closeConnection();
  });

  beforeEach(async () => {
    liveAgency = new Agency('XXX', 'XXX-ZZX');
    await dbHelper.seedDb('agencies', [liveAgency]);
  });

  it('should delete Agency', async () => {
    const command = new DeleteAgencyCommand(liveAgency.id);
    const result = await commandBus.execute(command);
    expect(result).toBe(true);
  });
});
