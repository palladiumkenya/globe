import { IEvent } from '@nestjs/cqrs';

export class SiteUpdatedEvent implements IEvent {
  constructor(public readonly id: string) {
  }
}

