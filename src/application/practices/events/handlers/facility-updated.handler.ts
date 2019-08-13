import { EventsHandler, IEvent, IEventHandler } from '@nestjs/cqrs';
import { FacilityCreatedEvent } from '../facility-created.event';
import { Logger } from '@nestjs/common';
import { FacilityUpdatedEvent } from '../facility-updated.event';

@EventsHandler(FacilityUpdatedEvent)
export class FacilityUpdatedEventHandler implements IEventHandler<FacilityUpdatedEvent> {
  handle(event: FacilityUpdatedEvent): any {
    Logger.debug(`=== FacilityUpdated ===:${event.id}`);
  }
}
