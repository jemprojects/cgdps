export class Trafico {
  id: number;
  nombre: string;

  constructor(result) {
    this.id = result.id;
    this.nombre = result.trafico;
  }
}
