import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { countySchema } from './core/application/locations/schemas/county-schema';
import { LocationsController } from './core/application/locations/controllers/locations.controller';
import { County } from './core/domain/locations/county';
import { TestDbHelper } from '../test/test-db.helper';
import { LocationsModule } from './core/application/locations/locations.module';
import { getTestCounties } from '../test/test.data';
import { GetLocationsHandler } from './core/application/locations/queries/handlers/get-locations.handler';
import { QueryBus } from '@nestjs/cqrs';
import { GetLocationsQuery } from './core/application/locations/queries/get-locations.query';
import { AppModule } from './app.module';

describe('AppController', () => {

  let module: TestingModule;
  let appController: AppController;
  const dbHelper = new TestDbHelper();

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot(dbHelper.url, dbHelper.options),
        AppModule,
      ],
    }).compile();
    await dbHelper.initConnection();
    appController = module.get<AppController>(AppController);
  });

  afterAll(async () => {
    await dbHelper.clearDb();
    await dbHelper.closeConnection();
  });

  describe('root', () => {
    it('should return "dwapi Globe"', () => {
      expect(appController.getAppName()).toBe('dwapi Globe');
    });
  });
});
