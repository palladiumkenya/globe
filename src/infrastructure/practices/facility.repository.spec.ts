import {  Logger } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { TestDbHelper } from '../../../test/test-db.helper';
import { MongooseModule } from '@nestjs/mongoose';
import { FacilityRepository } from './facility.repository';
import { Facility } from '../../domain/practices/facility';
import { facilitySchema } from './schemas/facility.schema';

describe('Facility Repository Test', () => {
  let module: TestingModule;
  let repository: FacilityRepository;
  const dbHelper = new TestDbHelper();

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot(dbHelper.url, dbHelper.options),
        MongooseModule.forFeature([{ name: Facility.name, schema: facilitySchema }]),
      ],
      providers: [FacilityRepository],
    }).compile();

    await dbHelper.initConnection();
    repository = module.get<FacilityRepository>(FacilityRepository);
  });

  afterAll(async () => {
    await dbHelper.clearDb();
    await dbHelper.closeConnection();
  });

  it('should be defined', async () => {
    expect(repository).toBeDefined();
  });
});
