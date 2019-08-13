import { EventsHandler, IEvent, IEventHandler } from '@nestjs/cqrs';
import { AgencyCreatedEvent } from '../agency-created.event';
import { Logger } from '@nestjs/common';

@EventsHandler(AgencyCreatedEvent)
export class AgencyCreatedEventHandler implements IEventHandler<AgencyCreatedEvent> {
  handle(event: AgencyCreatedEvent): any {
    Logger.debug(`=== AgencyCreated ===:${event._id}`);
  }
}
