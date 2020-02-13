import { Puerto } from './puertos';

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
export class Empresa {
  id: number;
  empresa: string;

  constructor(result) {
    this.id = result.id;
    this.empresa = result.empresa;
  }

}
export class Envase {
  id: number;
  envase: string;

  constructor(result) {
    this.id = result.id;
    this.envase = result.envase;
  }

}
export class Movimiento {
  nroGiro: number;
  tipo: string;
  operacion: string;
  empresa: string;
  envase: string;
  cantidad: number;
  puertoOrigen: Puerto;
  producto: string;

  constructor(result) {
    this.nroGiro = result.nroGiro;
    this.tipo = result.tipo;
    this.operacion = result.operacion;
    this.empresa = result.empresa;
    this.envase = result.envase;
    this.cantidad = result.cantidad;
    this.puertoOrigen = result.puertoOrigen;
    this.producto = result.producto;
  }
}
