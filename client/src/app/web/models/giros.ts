export class Giros {
  orden: number;
  muelle: string;
  sector: string;

  constructor(result) {
    this.orden = result.orden;
    this.muelle = result.muelle;
    this.sector = result.sector;
  }
}
