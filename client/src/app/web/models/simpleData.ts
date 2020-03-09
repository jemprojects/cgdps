import { Puerto } from "./puertos";

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
export class Rubro {
  id: number;
  rubro_esp: string;
  constructor(result) {
    this.id = result.id;
    this.rubro_esp = result.rubro_esp;
  }
}
export class EmpresaServPorts {
  id: number;
  esp: string;

  constructor(result) {
    this.id = result.id;
    this.esp = result.esp;
  }
}
export class Esp {
  id: number;
  nroGiro: number;
  empresa: EmpresaServPorts;
  rubro: Rubro;

  constructor(result) {
    this.id = result.id;
    this.nroGiro = result.nroGiro;
    this.empresa = result.empresa;
    this.rubro = result.rubro;
  }
}
