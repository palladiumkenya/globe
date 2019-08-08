import { IEvent } from '@nestjs/cqrs';

export class FacilityDeletedEvent implements IEvent {
  constructor(public readonly id: string,
              public readonly code: number) {
  }
}
