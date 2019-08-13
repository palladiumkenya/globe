import * as uuid from 'uuid';

export class County {
  _id: string;

  constructor(
    public code: number,
    public name: string) {
    this._id = uuid();
  }

  toString() {
    return `${this.name}`;
  }
}
