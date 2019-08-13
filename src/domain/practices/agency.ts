import { AggregateRoot } from '@nestjs/cqrs';
import { AgencyCreatedEvent } from '../../application/practices/events/agency-created.event';
import * as uuid from 'uuid';
import { AgencyUpdatedEvent } from '../../application/practices/events/agency-updated.event';

export class Agency extends AggregateRoot {
  id: string;
  constructor(
    public name: string,
    public display: string) {
    super();
    this.id = uuid.v1();
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
