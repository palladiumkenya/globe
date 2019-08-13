import { EventsHandler, IEvent, IEventHandler } from '@nestjs/cqrs';
import { AgencyCreatedEvent } from '../agency-created.event';
import { Logger } from '@nestjs/common';
import { AgencyUpdatedEvent } from '../agency-updated.event';

@EventsHandler(AgencyUpdatedEvent)
export class AgencyUpdatedEventHandler implements IEventHandler<AgencyUpdatedEvent> {
  handle(event: AgencyUpdatedEvent): any {
    Logger.debug(`=== AgencyUpdated ===:${event.id}`);
  }
}
