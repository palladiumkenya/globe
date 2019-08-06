export class Mechanism {
  id: string;
  code: string;
  name: string;
  display: string;

  constructor(id: string, code: string, name: string, display: string) {
    this.id = id;
    this.code = code;
    this.name = name;
    this.display = display;
  }
}
