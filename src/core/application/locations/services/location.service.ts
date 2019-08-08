import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { County } from '../../../domain/locations/county';
import { Model } from 'mongoose';
import { BaseService } from '../../common/base.service';

@Injectable()
export class LocationService extends BaseService<County> {
  constructor(
    @InjectModel('County')
    private readonly countyModel: Model<County>) {
    super(countyModel);
  }
}
