import { Logger } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { TestDbHelper } from '../../../test/test-db.helper';
import { MongooseModule } from '@nestjs/mongoose';
import { Facility } from '../../domain/practices/facility';
import { facilitySchema } from './schemas/facility.schema';
import {  getTestMechanismWithFacilites } from '../../../test/test.data';
import { PracticesInfrastructureModule } from './practices.infrastructure.module';
import { IFacilityRepository } from '../../domain/practices/facility-repository.interface';

describe('Facility Repository Test', () => {
  let module: TestingModule;
  let repository: IFacilityRepository;
  const dbHelper = new TestDbHelper();
  const agenciesWithMechanisms = getTestMechanismWithFacilites();

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [
        PracticesInfrastructureModule,
        MongooseModule.forRoot(dbHelper.url, dbHelper.options),
        MongooseModule.forFeature([{ name: Facility.name, schema: facilitySchema }]),
      ],
    }).compile();

    await dbHelper.initConnection();
    for (const mechanism of agenciesWithMechanisms) {
      const facilities = mechanism.facilities;
      mechanism.facilities = facilities.map(({ _id }) => _id);
      await dbHelper.seedDb('mechanisms', [mechanism]);
      await dbHelper.seedDb('facilities', facilities);
    }
    repository = module.get<IFacilityRepository>('IFacilityRepository');
  });

  afterAll(async () => {
    await dbHelper.clearDb();
    await dbHelper.closeConnection();
  });

  it('should be defined', async () => {
    expect(repository).toBeDefined();
  });

  it('should load mechanisms', async () => {
    const facilities = await repository.getFacilities();
    expect(facilities.length).toBeGreaterThan(0);
    const { agency } = facilities[0];
    expect(agency).not.toBeNull();
    facilities.forEach(f => Logger.debug(`${f.name} - ${f.mechanism.name}`));
  });
});
