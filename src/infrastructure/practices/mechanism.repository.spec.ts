import { Logger } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { TestDbHelper } from '../../../test/test-db.helper';
import { MongooseModule } from '@nestjs/mongoose';
import { getTestAgencyWithMechanisms } from '../../../test/test.data';
import { PracticesInfrastructureModule } from './practices.infrastructure.module';
import { IMechanismRepository } from '../../domain/practices/mechanism-repository.interface';

describe('Mechanism Repository  Tests', () => {
  let module: TestingModule;
  let repository: IMechanismRepository;
  const dbHelper = new TestDbHelper();
  const agenciesWithMechanisms = getTestAgencyWithMechanisms();

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [
        PracticesInfrastructureModule,
        MongooseModule.forRoot(dbHelper.url, dbHelper.options),
      ],
    }).compile();

    await dbHelper.initConnection();

    for (const agency of agenciesWithMechanisms) {
      const mechanisms = agency.mechanisms;
      agency.mechanisms = mechanisms.map(({ _id }) => _id);
      await dbHelper.seedDb('agencies', [agency]);
      await dbHelper.seedDb('mechanisms', mechanisms);
    }
    repository = module.get<IMechanismRepository>(`IMechanismRepository`);
  });

  afterAll(async () => {
    await dbHelper.clearDb();
    await dbHelper.closeConnection();
  });

  it('should be defined', async () => {
    expect(repository).toBeDefined();
  });

  it('should load mechanisms', async () => {
    const mechanisms = await repository.getMechanisms();
    expect(mechanisms.length).toBeGreaterThan(0);
    const { agency } = mechanisms[0];
    expect(agency).not.toBeNull();
    mechanisms.forEach(m => Logger.debug(`${m.name} - ${m.agency.name}`));
  });
});
