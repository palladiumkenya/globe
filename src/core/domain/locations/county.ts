import { AggregateRoot } from '@nestjs/cqrs';
import { SubCounty } from './sub-county';

export class County extends AggregateRoot {
  id: number;
  name: string;
  subCounties: SubCounty[] = [];

  constructor(id: number, name: string) {
    super();
    this.id = id;
    this.name = name;
  }
}
