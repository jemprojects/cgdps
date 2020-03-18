import { DatePipe } from '@angular/common';

export class Entrada {
  key: string
  id: number;
  giro: number;
  buque: number;
  agencia: number;
  procedencia: number;
  destino: number;
  entrada: Date;
  salida: Date;
  muelle: number;
  trafico: number;
  documento: number;
  nroPasavante: number;
  cal_ent: number;
  cal_sal: number;

  constructor(result) {
    this.key = result.key
    this.id = result.key;
    this.giro = result.giro;
    this.buque = result.buque;
    this.agencia = result.agencia;
    this.procedencia = result.procedencia;
    this.destino = result.destino;
    this.entrada = result.entrada;
    this.salida = result.salida;
    this.muelle = result.muelle;
    this.trafico = result.trafico;
    this.documento = result.documento;
    this.nroPasavante = result.nroPasavante;
    this.cal_ent = result.cal_ent;
    this.cal_sal = result.cal_sal;
  }
}
