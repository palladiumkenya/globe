import { IEvent } from '@nestjs/cqrs';

export class SiteDeletedEvent implements IEvent {
  constructor(public readonly id: string) {
  }
}
