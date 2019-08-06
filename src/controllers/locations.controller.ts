import { Controller, Get } from '@nestjs/common';
import { County } from '../core/domain/locations/county';
import { LocationService } from '../core/application/locations/services/location.service';

@Controller('locations')
export class LocationsController {
  constructor(private readonly locationService: LocationService) {
  }

  @Get()
  getCounties(): County[] {
    return this.locationService.getCounties();
  }
}
