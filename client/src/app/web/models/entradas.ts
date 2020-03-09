import { DatePipe } from '@angular/common';

export class Entrada {
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
    if (result.id != 0) {
      this.id = result.id;
    } else {
      this.id = +1;
    }

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
