import * as uuid from 'uuid';

export class County {
  id: string;

  constructor(
    public code: number,
    public name: string) {
    this.id = uuid();
  }

  toString() {
    return `${this.name}`;
  }
}
