import { Test, TestingModule } from '@nestjs/testing';
import { LocationsController } from './locations.controller';
import { LocationService } from '../services/location.service';

describe('Locations Controller', () => {
  let controller: LocationsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LocationsController], providers: [LocationService],
    }).compile();

    controller = module.get<LocationsController>(LocationsController);
  });

  it('should get counties', () => {
    const counties = controller.getCounties();
    expect(counties.length).toBeGreaterThan(0);
  });
});
