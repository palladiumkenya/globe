import { AggregateRoot } from '@nestjs/cqrs';
import { AgencyCreatedEvent } from '../../application/practices/events/agency-created.event';
import uuidv1 from 'uuid/v1';
import { AgencyUpdatedEvent } from '../../application/practices/events/agency-updated.event';

export class Agency extends AggregateRoot {
  id: string;
  name: string;
  display: string;

  constructor(name: string, display: string) {
    super();
    this.id = uuidv1();
    this.name = name;
    this.display = display;
    this.apply(new AgencyCreatedEvent(this.id));
  }

  changeDetails(name: string, display: string) {
    this.name = name;
    this.display = display;
    this.apply(new AgencyUpdatedEvent(this.id));
  }
}
