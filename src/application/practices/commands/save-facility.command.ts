export class SaveFacilityCommand {
  constructor(
    public readonly code: number,
    public readonly name: string,
    public readonly id?: string,
  ) {
  }
}
