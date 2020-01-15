
export class Mercaderia {
  orden: number;
  tipo: string;

  constructor(result) {
    this.orden = result.orden;
    this.tipo = result.tipo;
  }
}
