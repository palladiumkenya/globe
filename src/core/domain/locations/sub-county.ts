import { Ward } from './ward';

export class SubCounty {
  id: number;
  name: string;
  countyId: number;
  wards: Ward[] = [];

  constructor(id: number, name: string, countyId: number) {
    this.id = id;
    this.name = name;
    this.countyId = countyId;
  }
}
