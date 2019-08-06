export class Ward {
  id: number;
  name: string;
  subCountyId: number;

  constructor(id: number, name: string, subCountyId: number) {
    this.id = id;
    this.name = name;
    this.subCountyId = subCountyId;
  }
}
