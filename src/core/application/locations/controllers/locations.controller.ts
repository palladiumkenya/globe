import { Body, Controller, Get, Post } from '@nestjs/common';
import { County } from '../../../domain/locations/county';
import { LocationService } from '../services/location.service';
import { CountyDto } from '../../../domain/locations/dtos/county.dto';

@Controller('locations')
export class LocationsController {
  constructor(private readonly locationService: LocationService) {
  }

  @Get()
  async getCounties(): Promise<County[]> {
    const counties = await this.locationService.getAll();
    return counties;
  }
}
