export class Buques {
  key: string;
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

  constructor(result) {
    if (result.key == null) {
    }
    this.key = result.key;
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
  }
}
