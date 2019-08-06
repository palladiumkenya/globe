import { AggregateRoot } from '@nestjs/cqrs';

export class MechanismRegistry extends AggregateRoot {
  id: string;
  facilityId: string;
  partnerId: string;

  constructor(id: string, facilityId: string, partnerId: string) {
    super();
    this.id = id;
    this.facilityId = facilityId;
    this.partnerId = partnerId;
  }
}
