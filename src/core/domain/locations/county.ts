export class County {
  code: number;
  name: string;

  constructor(code: number, name: string) {
    this.code = code;
    this.name = name;
  }

  toString() {
    return `${this.name}`;
  }
}
