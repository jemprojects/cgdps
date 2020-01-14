export class Buques {
  orden: number;
  nombre: string;
  bandera: number;
  arboladura: number;
  eslora: number;
  manga: number;
  puntal: number;
  trn: number;
  trb: number;
  imo: number;
  campo1: number;

  constructor(result) {
    this.orden = result.orden;
    this.nombre = result.nombre;
    this.bandera = result.bandera;
    this.arboladura = result.arboladura;
    this.eslora = result.eslora;
    this.manga = result.manga;
    this.puntal = result.puntal;
    this.trn = result.trn;
    this.trb = result.trb;
    this.imo = result.imo;
    this.campo1 = result.campo1;
  }
}
