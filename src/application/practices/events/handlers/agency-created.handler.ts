import { EventsHandler, IEvent, IEventHandler } from '@nestjs/cqrs';
import { AgencyCreatedEvent } from '../agency-created.event';
import { Inject, Logger } from '@nestjs/common';
import { IAgencyRepository } from '../../../../domain/practices/agency-repository.interface';
import { ClientProxy } from '@nestjs/microservices';

@EventsHandler(AgencyCreatedEvent)
export class AgencyCreatedEventHandler implements IEventHandler<AgencyCreatedEvent> {

  constructor(
    @Inject('GLOBE_SERVICE') private readonly client: ClientProxy,
    @Inject('IAgencyRepository')
    private readonly agencyRepository: IAgencyRepository) {
  }

  async handle(event: AgencyCreatedEvent) {
    Logger.debug(`=== AgencyCreated ===:${event._id}`);
    const agency = await this.agencyRepository.get(event._id);
    if (agency) {
      await this.client.emit(AgencyCreatedEvent.name, JSON.stringify(agency))
        .toPromise()
        .catch((err) => Logger.error(err));
      Logger.debug(`*** AgencyCreated Published ****:${event._id}`);
    }
  }
}
