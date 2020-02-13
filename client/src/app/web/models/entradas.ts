export class Entrada {
   id: number;
   giro: number;
   buque: number;
   agencia: string;
   procedencia: string;
   destino: string;
   entrada: Date;
   salida: Date;
   muelle: string;
   trafico: string;
   documento: string;
   nroPasavante: number;
   cal_ent: number;
   cal_sal: number;
   envase_desc: string;
   empresa_desc: string;
   carga: string;
   tns_carga: string;
   envase_carg: string;
   empresa_car: string;
   cal_ent1: string;
   cal_sal1: string;
   tipo: string;

  constructor(result) {
    if(result.id!=0){
      this.id = result.id;
    }
    else{
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
    this.nroPasavante = result.nro;
    this.cal_ent = result.cal_ent;
    this.cal_sal = result.cal_sal;
    this.envase_carg = result.envase_carg;
    this.envase_desc = result.envase_desc;
    this.carga = result.carga;
    this.tns_carga = result.tns_carga;
    this.empresa_car = result.empresa_car;
    this.empresa_desc = result.empresa_desc;
  }
}
