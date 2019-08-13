import { Injectable, Logger } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SeedReader } from '../common/seed-reader';
import { PracticeSeeder } from './practice.seeder';
import { MongooseModule } from '@nestjs/mongoose';
import { TestDbHelper } from '../../../test/test-db.helper';
import { AgencyRepository } from './agency.repository';
import { agencySchema } from './schemas/agency.schema';

describe('Practice Seeder Tests', () => {
  let module: TestingModule;
  let seeder: PracticeSeeder;
  const dbHelper = new TestDbHelper();

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot(dbHelper.url, dbHelper.options),
        MongooseModule.forFeature([{ name: 'Agency', schema: agencySchema }]),
      ],
      providers: [PracticeSeeder, SeedReader, AgencyRepository],
    }).compile();

    await dbHelper.initConnection();
    seeder = module.get<PracticeSeeder>(PracticeSeeder);
  });

  afterAll(async () => {
    await dbHelper.clearDb();
    await dbHelper.closeConnection();
  });

  it('should load Agency Seed', async () => {
    const seeds = await seeder.loadAgencies();
    expect(seeds.length).toBeGreaterThan(0);
    seeds.forEach(s => Logger.debug(`${s.name} ${s} (${s.id})`));
  });

  it('should load Mechanism Seed', async () => {
    const seeds = await seeder.loadMechanisms();
    expect(seeds.length).toBeGreaterThan(0);
    seeds.forEach(s => Logger.debug(`${s.name} ${s} (${s.id})`));
  });

  it('should load Facility Seed', async () => {
    const seeds = await seeder.loadAgencies();
    expect(seeds.length).toBeGreaterThan(0);
    seeds.forEach(s => Logger.debug(`${s.name} ${s} (${s.id})`));
  });

  it('should seed', async () => {
    const seeds = await seeder.seed();
    expect(seeds).toBeGreaterThan(-1);
    Logger.debug(`Seeded: ${seeds}`);
  });
});
