import { Agency } from './agency';
import { Facility } from './facility';
import { AggregateRoot } from '@nestjs/cqrs';
import { AgencyCreatedEvent } from '../../application/practices/events/agency-created.event';
import { MechanismCreatedEvent } from '../../application/practices/events/mechanism-created.event';
import { MechanismUpdatedEvent } from '../../application/practices/events/mechanism-updated.event';
import * as uuid from 'uuid';

export class Mechanism extends AggregateRoot {

  id: string;

  constructor(
    public code: string,
    public name: string,
    public implementationName: string,
    public agency?: Agency) {
    super();
    this.id = uuid.v1();
    this.code = code;
    this.name = name;
    this.implementationName = implementationName;
    this.apply(new MechanismCreatedEvent(this.id));
  }

  changeDetails(code: string, name: string, implementationName: string, agency?: Agency) {
    this.code = code;
    this.name = name;
    this.implementationName = implementationName;
    this.agency = agency;
    this.apply(new MechanismUpdatedEvent(this.id));
  }
}
