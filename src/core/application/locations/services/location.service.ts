import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { County } from '../../../domain/locations/county';
import { Model } from 'mongoose';

@Injectable()
export class LocationService {

  constructor(
    @InjectModel('County')
    private readonly countyModel: Model<County>,
  ) {
  }

   create(county: County): Promise<County> {
    const createdCounty = new this.countyModel(county);
    return createdCounty.save();
  }

  async getAll(): Promise<County[]> {
    return this.countyModel.find().exec();
  }
}
