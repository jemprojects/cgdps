export class Buques {
  ORDEN: number
  NOMBRE: string
  BANDERA: number
  ARBOLADURA: number
  ESLORA: number
  MANGA: number
  PUNTAL: number
  TRN: number
  TRB: number
  IMO: number
  CAMPO1: number

  // tslint:disable-next-line: align
  constructor(result) {
    this.ORDEN = result.orden
    this.NOMBRE = result.nombre
    this.BANDERA = result.bandera
    this.ARBOLADURA = result.arboladura
    this.ESLORA = result.eslora
    this.MANGA = result.manga
    this.PUNTAL = result.puntal
    this.TRN = result.trn
    this.TRB = result.trb
    this.IMO = result.imo
    this.CAMPO1 = result.campo1
  }
}
