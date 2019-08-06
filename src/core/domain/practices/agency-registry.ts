import { AggregateRoot } from '@nestjs/cqrs';

export class AgencyRegistry extends AggregateRoot {
  id: string;
  agencyId: string;
  mechanismId: string;
  implementationName: string;

  constructor(id: string, masterFacilityId: string, partnerId: string) {
    super();
    this.id = id;
    this.mechanismId = masterFacilityId;
    this.agencyId = partnerId;
  }
}
