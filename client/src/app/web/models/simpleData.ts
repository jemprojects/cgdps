export class Bandera {
  orden: number;
  bandera: string;

  constructor(result) {
    this.orden = result.orden;
    this.bandera = result.bandera;
  }
}
export class Arboladura {
  codigo: number;
  arboladura: string;

  constructor(result) {
    this.codigo = result.codigo;
    this.arboladura = result.arboladura;
  }
}
export class Trafico {
  id: number;
  trafico: string;

  constructor(result) {
    this.id = result.id;
    this.trafico = result.trafico;
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
