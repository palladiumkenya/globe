import {  Logger } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { TestDbHelper } from '../../../test/test-db.helper';
import { MongooseModule } from '@nestjs/mongoose';
import { AgencyRepository } from './agency.repository';
import { Agency } from '../../domain/practices/agency';
import { agencySchema } from './schemas/agency.schema';

describe('Agency Repository  Tests', () => {
  let module: TestingModule;
  let repository: AgencyRepository;
  const dbHelper = new TestDbHelper();

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot(dbHelper.url, dbHelper.options),
        MongooseModule.forFeature([{ name: Agency.name, schema: agencySchema }]),
      ],
      providers: [AgencyRepository],
    }).compile();

    await dbHelper.initConnection();
    repository = module.get<AgencyRepository>(AgencyRepository);
  });

  afterAll(async () => {
    await dbHelper.clearDb();
    await dbHelper.closeConnection();
  });

  it('should be defined', async () => {
    expect(repository).toBeDefined();
  });
});
