export class Operacion {
  id: number;
  mercaderia: string;
  tns: number;
  tipo: string;
  giro_id: number;

  constructor(result) {
    this.id = result.id;
    this.mercaderia = result.mercaderia;
    this.tns = result.tns;
    this.tipo = result.tipo;
    this.giro_id = result.giro_id;
  }
}
export class Mercaderia {
  orden: number;
  tipo: string;

  constructor(result) {
    this.orden = result.orden;
    this.tipo = result.tipo;
  }
}
export class Tipo {
  id: number;
  tipo: string;

  constructor(result) {
    this.id = result.id;
    this.tipo = result.tipo;
  }
}
