export class FacilityDeletedEvent {
  constructor(public readonly id: string,
              public readonly code: number) {
  }
}
