import * as uuid from 'uuid';
import { AggregateRoot } from '@nestjs/cqrs';
import { Mechanism } from './mechanism';
import { County } from '../locations/county';
import { FacilityCreatedEvent, FacilityUpdatedEvent } from '../../application/practices/events';

export class Facility extends AggregateRoot {
  _id: string;

  constructor(
    public code: number,
    public name: string,
    public county?: County,
    public mechanism?: Mechanism) {
    super();
    this._id = uuid.v1();
    this.code = code;
    this.name = name;
    this.county = county;
    this.mechanism = mechanism;
    this.apply(new FacilityCreatedEvent(this._id));
  }

  changeDetails(code: number, name: string, county?: County, mechanism?: Mechanism) {
    this.code = code;
    this.name = name;
    this.mechanism = mechanism;
    this.apply(new FacilityUpdatedEvent(this._id));
  }
}
