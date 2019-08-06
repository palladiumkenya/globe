import { Injectable } from '@nestjs/common';
import { County } from '../../../domain/locations/county';

@Injectable()
export class LocationService {
  private readonly counties: County[] = [
    new County(47, 'Mombasa'),
    new County(47, 'Nairobi'),
  ];

  getCounties(): County[] {
    return this.counties;
  }
}
