import { IEvent } from '@nestjs/cqrs';

export class AgencyUpdatedEvent implements IEvent {
  constructor(public readonly id: string) {
  }
}

