export class Agencias {
  orden: number;
  agencia: string;
  cuit: string;
  direccion: string;
  telefono: number;
  mail: string;
  constructor(result) {
    this.orden = result.orden;
    this.agencia = result.agencia;
    this.cuit = result.cuit;
    this.direccion = result.direccion;
    this.telefono = result.telefono;
    this.mail = result.mail;
  }
}
