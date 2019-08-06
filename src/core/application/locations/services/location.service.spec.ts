import { Test, TestingModule } from '@nestjs/testing';
import { LocationService } from './location.service';

describe('LocationsService', () => {
  let service: LocationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LocationService],
    }).compile();

    service = module.get<LocationService>(LocationService);
  });

  it('should get counties', () => {
    const counties = service.getCounties();
    expect(counties.length).toBeGreaterThan(0);
  });
});
