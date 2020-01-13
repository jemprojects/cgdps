export class Puerto {
  orden: number;
  nombre: string;
  pais: string;

  constructor(result) {
    this.orden = result.orden;
    this.nombre = result.puerto;
    this.pais = result.pais;
  }
}
