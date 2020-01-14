export class Agencias {
  orden: number;
  nombre: string;
  cuit: string;
  direccion: string;
  telefono: number;

  constructor(result) {
    this.orden = result.orden;
    this.nombre = result.agencia;
    this.cuit = result.cuit;
    this.direccion = result.direccion;
    this.telefono = result.telefono;
  }
}
