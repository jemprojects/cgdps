export class Puerto {
  orden: number;
  puerto: string;
  pais: string;

  constructor(result) {
    this.orden = result.orden;
    this.puerto = result.puerto;
    this.pais = result.pais;
  }
}
