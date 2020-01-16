export class Entrada {
  public id: number;
  public giro: number;
  public buque: string;
  public agencia: string;
  public procedencia: string;
  public destino: string;
  public entrada: Date;
  public salida: Date;
  public muelle: string;
  public trafico: number;
  public documento: number;
  public nroPasavante: number;
  public cal_ent: number;
  public cal_sal: number;
  public envase_desc: string;
  public empresa_desc: string;
  public carga: string;
  public tns_carga: string;
  public envase_carg: string;
  public empresa_car: string;
  public cal_ent1: string;
  public cal_sal1: string;
  public tipo: string;
  constructor(result) {
    this.id = result.id;
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
