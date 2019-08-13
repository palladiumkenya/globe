import { EventsHandler, IEvent, IEventHandler } from '@nestjs/cqrs';
import { MechanismCreatedEvent } from '../mechanism-created.event';
import { Logger } from '@nestjs/common';
import { MechanismUpdatedEvent } from '../mechanism-updated.event';

@EventsHandler(MechanismUpdatedEvent)
export class MechanismUpdatedEventHandler implements IEventHandler<MechanismUpdatedEvent> {
  handle(event: MechanismUpdatedEvent): any {
    Logger.debug(`=== MechanismUpdated ===:${event._id}`);
  }
}
