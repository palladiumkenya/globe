import {  Logger } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { TestDbHelper } from '../../../test/test-db.helper';
import { MongooseModule } from '@nestjs/mongoose';
import { LocationRepository } from './location.repository';
import { countySchema } from './schemas/county.schema';
import { County } from '../../domain/locations/county';

describe('Location Repository  Tests', () => {
  let module: TestingModule;
  let repository: LocationRepository;
  const dbHelper = new TestDbHelper();

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot(dbHelper.url, dbHelper.options),
        MongooseModule.forFeature([{ name: County.name, schema: countySchema }]),
      ],
      providers: [LocationRepository],
    }).compile();

    await dbHelper.initConnection();
    repository = module.get<LocationRepository>(LocationRepository);
  });

  afterAll(async () => {
    await dbHelper.clearDb();
    await dbHelper.closeConnection();
  });

  it('should be defined', async () => {
    expect(repository).toBeDefined();
  });
});
