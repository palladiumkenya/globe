import { AggregateRoot } from '@nestjs/cqrs';
import { AgencyCreatedEvent } from '../../application/practices/events/agency-created.event';
import * as uuid from 'uuid';
import { AgencyUpdatedEvent } from '../../application/practices/events/agency-updated.event';

export class Agency extends AggregateRoot {

  id: string;
  name: string;
  display: string;

  constructor(name: string, display: string) {
    super();
    const idd = uuid();
    this.id = uuid();
    this.name = name;
    this.display = display;
    this.apply(new AgencyCreatedEvent(this.id));
  }

  changeDetails(name: string, display: string) {
    this.name = name;
    this.display = display;
    this.apply(new AgencyUpdatedEvent(this.id));
  }

  toString() {
    return `${this.display}`;
  }
}
