import { EventsHandler, IEvent, IEventHandler } from '@nestjs/cqrs';
import { FacilityCreatedEvent } from '../facility-created.event';
import { Logger } from '@nestjs/common';

@EventsHandler(FacilityCreatedEvent)
export class FacilityCreatedEventHandler implements IEventHandler<FacilityCreatedEvent> {
  handle(event: FacilityCreatedEvent): any {
    Logger.debug(`=== FacilityCreated ===:${event.id}`);
  }
}
