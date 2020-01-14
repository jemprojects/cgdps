import { Component, OnInit } from "@angular/core";
import { MAT_DATE_FORMATS, MatDialog } from "@angular/material";

import { Agencias } from "src/app/web/models/agencias";
import { AgenciasService } from "src/app/web/services/agencias.service";
import { Buques } from "src/app/web/models/buques";
import { BuquesService } from "src/app/web/services/buques.service";
import { Entrada } from "src/app/web/models/entradas";
import { EntradasService } from "src/app/web/services/entradas.service";
import { FormControl } from "@angular/forms";
import { Giros } from "src/app/web/models/giros";
import { GirosService } from "src/app/web/services/giros.service";
import { PuertosService } from "src/app/web/services/puertos.service";
import { Trafico } from "src/app/web/models/trafico";
import { TraficoService } from "src/app/web/services/trafico.service";

export const DD_MM_YYYY_Format = {
  parse: {
    dateInput: "LL"
  },
  display: {
    dateInput: "DD/MM/YYYY",
    monthYearLabel: "MMM YYYY",
    dateA11yLabel: "LL",
    monthYearA11yLabel: "MMMM YYYY"
  }
};
@Component({
  selector: "app-entradas-form",
  templateUrl: "./entradas-form.component.html",
  styleUrls: ["./entradas-form.component.css"],
  providers: [{ provide: MAT_DATE_FORMATS, useValue: DD_MM_YYYY_Format }]
})
export class EntradasFormComponent implements OnInit {
  // Buques
  buquesService: BuquesService;
  buques: Array<Buques>;
  // Agencias
  agenciasService: AgenciasService;
  agencias: Array<Agencias>;
  // Puertos
  puertosService: PuertosService;
  puertos: Array<Agencias>;
  // Giros
  girosService: GirosService;
  giros: Array<Giros>;
  // Trafico
  traficoService: TraficoService;
  traficos: Array<Trafico>;

  //Entradas
  entradaKey: string;
  entradasService: EntradasService;
  entradaInEdition: Entrada;

  isNew: boolean;
  constructor(
    public dialog: MatDialog,
    serviceBuques: BuquesService,
    serviceAgencias: AgenciasService,
    servicePuertos: PuertosService,
    serviceGiros: GirosService,
    serviceTrafico: TraficoService
  ) {
    this.buquesService = serviceBuques;
    this.agenciasService = serviceAgencias;
    this.puertosService = servicePuertos;
    this.girosService = serviceGiros;
    this.traficoService = serviceTrafico;
    this.entradaInEdition = null;
  }
  ngOnInit() {
    var scope = this;
    // tslint:disable-next-line: only-arrow-functions
    this.buquesService.getBuques(function(buques) {
      scope.buques = buques;
    });
    this.agenciasService.getAgencias(function(agencias) {
      scope.agencias = agencias;
    });
    this.puertosService.getPuertos(function(puertos) {
      scope.puertos = puertos;
    });
    this.girosService.getGiros(function(giros) {
      scope.giros = giros;
    });
    this.traficoService.getTraficos(function(traficos) {
      scope.traficos = traficos;
    });
    this.setupFormNewProvider();
  }
  setupFormEditEntrada() {
    this.isNew = false;
    this.entradasService.getEntrada(this.entradaKey, data => {
      this.entradaInEdition = new Entrada(data);
      this.entradaInEdition.giro = 1;
    });
  }

  setupFormNewProvider() {
    this.isNew = true;
    this.entradaInEdition = new Entrada({
      id: "",
      giro: "",
      buque: "",
      agencia: "",
      procedencia: "",
      destino: "",
      entrada: new Date(),
      salida: new Date(),
      trafico: "",
      muelle: "",
      documento: "",
      nroPasavante: "",
      cal_ent: "",
      cal_sal: "",
      envase_desc: "",
      empresa_desc: "",
      carga: "",
      tns_carga: "",
      envase_carg: "",
      empresa_car: "",
      cal_ent1: "",
      cal_sal1: "",
      tipo: ""
    });
  }
}
