import { Injectable, Logger } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SeedReader } from '../common/seed-reader';
import { LocationSeeder } from './location.seeder';
import { TestDbHelper } from '../../../test/test-db.helper';
import { MongooseModule } from '@nestjs/mongoose';
import { countySchema } from './schemas/county.schema';
import { LocationRepository } from './location.repository';

describe('Location Seeder Tests', () => {
  let module: TestingModule;
  let seeder: LocationSeeder;
  const dbHelper = new TestDbHelper();

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot(dbHelper.url, dbHelper.options),
        MongooseModule.forFeature([{ name: 'County', schema: countySchema }]),
      ],
      providers: [LocationSeeder, SeedReader, LocationRepository],
    }).compile();

    await dbHelper.initConnection();
    seeder = module.get<LocationSeeder>(LocationSeeder);
  });

  afterAll(async () => {
    await dbHelper.clearDb();
    await dbHelper.closeConnection();
  });

  it('should loadAgencies County Seed', async () => {
    const seeds = await seeder.load();
    expect(seeds.length).toBeGreaterThan(-1);
    seeds.forEach(s => Logger.debug(`${s.code} ${s} (${s.id})`));
  });
});
