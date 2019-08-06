export class PartnerDeletedEvent {
  constructor(public readonly id: string,
              public readonly code: number) {
  }
}

