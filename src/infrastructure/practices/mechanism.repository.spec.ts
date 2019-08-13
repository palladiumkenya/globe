import {  Logger } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { TestDbHelper } from '../../../test/test-db.helper';
import { MongooseModule } from '@nestjs/mongoose';
import { MechanismRepository } from './mechanism.repository';
import { Mechanism } from '../../domain/practices/mechanism';
import { mechanismSchema } from './schemas/mechanism.schema';

describe('Mechanism Repository  Tests', () => {
  let module: TestingModule;
  let repository: MechanismRepository;
  const dbHelper = new TestDbHelper();

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot(dbHelper.url, dbHelper.options),
        MongooseModule.forFeature([{ name: Mechanism.name, schema: mechanismSchema }]),
      ],
      providers: [MechanismRepository],
    }).compile();

    await dbHelper.initConnection();
    repository = module.get<MechanismRepository>(MechanismRepository);
  });

  afterAll(async () => {
    await dbHelper.clearDb();
    await dbHelper.closeConnection();
  });

  it('should be defined', async () => {
    expect(repository).toBeDefined();
  });
});
