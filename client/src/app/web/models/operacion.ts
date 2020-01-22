export class Operacion {
  id: number;
  mercaderia: string;
  tns: number;
  tipo:string
  giro_id:number

  constructor(result) {
    this.id= result.id
    this.mercaderia = result.mercaderia;
    this.tns = result.tns;
    this.tipo = result.tipo;
    this.giro_id= result.giro_id
  }
}
