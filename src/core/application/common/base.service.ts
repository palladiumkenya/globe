import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';

@Injectable()
export abstract class BaseService<T> {

  protected constructor(
    private readonly model: Model<T>,
  ) {
  }

  create(county: any): Promise<T> {
    const createdCounty = new this.model(county);
    return createdCounty.save();
  }

  async getAll(): Promise<T[]> {
    return this.model.find().exec();
  }
}
