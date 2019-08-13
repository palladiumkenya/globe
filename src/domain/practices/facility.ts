import * as uuid from 'uuid';
import { AggregateRoot } from '@nestjs/cqrs';
import { FacilityUpdatedEvent } from '../../application/practices/events/facility-updated.event';
import { FacilityCreatedEvent } from '../../application/practices/events/facility-created.event';
import { Mechanism } from './mechanism';

export class Facility extends AggregateRoot {
  id: string;

  constructor(
    public code: number,
    public name: string,
    public mechanism?: Mechanism) {
    super();
    this.id = uuid.v1();
    this.code = code;
    this.name = name;
    this.mechanism = mechanism;
    this.apply(new FacilityCreatedEvent(this.id));
  }

  changeDetails(code: number, name: string, mechanism?: Mechanism) {
    this.code = code;
    this.name = name;
    this.mechanism = mechanism;
    this.apply(new FacilityUpdatedEvent(this.id));
  }
}
