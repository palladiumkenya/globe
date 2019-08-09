import { Test, TestingModule } from '@nestjs/testing';
import { LocationService } from './location.service';
import { County } from 'src/core/domain/locations/county';
import { MongooseModule } from '@nestjs/mongoose';
import { countySchema } from '../schemas/county-schema';
import { Logger } from '@nestjs/common';
import * as mongoose from 'mongoose';

describe('LocationsService', () => {
  const url = `mongodb+srv://livetest:maun@cluster0-v6fcj.mongodb.net/dwapiGlobeTest?retryWrites=true&w=majority`;
  let module: TestingModule;
  let service: LocationService;
  jest.setTimeout(10000);

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot(url, { useNewUrlParser: true }),
        MongooseModule.forFeature([{ name: 'County', schema: countySchema }]),
      ],
      providers: [LocationService],
    }).compile();
  });

  beforeEach(async () => {
    service = module.get<LocationService>(LocationService);
  });

  it('should create county', async () => {
    const county: County = {
      code: 2, name: 'Demo',
    };
    const result = await service.create(county);
    expect(result).not.toBeNull();
    Logger.debug(result);
  });

  it('should get counties', async () => {
    const county: County = {
      code: 4, name: 'Maun',
    };
    await service.create(county);
    const counties = await service.getAll();
    expect(counties.length).toBeGreaterThan(0);
    counties.forEach(c => Logger.debug(`${c}`));
  });

  afterAll(async () => {
    await cleardb();
  });

  const cleardb = async () => {
    await mongoose.connect(url, { useNewUrlParser: true });
    const collections = await mongoose.connection.db.listCollections().toArray();
    return Promise.all(
      collections
        .map(({ name }) => name)
        .map(collection => {
          Logger.debug(`Clearing ${collection}`);
          mongoose.connection.db.collection(collection).drop();
        }),
    );
  };
});
