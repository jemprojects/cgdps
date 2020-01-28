import { Component, OnInit } from '@angular/core';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, MatDialog } from '@angular/material';
import {
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
  MAT_MOMENT_DATE_FORMATS,
  MomentDateAdapter,
} from '@angular/material-moment-adapter';

import { Agencias } from 'src/app/web/models/agencias';
import { AgenciasService } from 'src/app/web/services/agencias.service';
import { Buques } from 'src/app/web/models/buques';
import { BuquesService } from 'src/app/web/services/buques.service';
import { Entrada } from 'src/app/web/models/entradas';
import { EntradasService } from 'src/app/web/services/entradas.service';
import { FormControl } from '@angular/forms';
import { Giros } from 'src/app/web/models/giros';
import { GirosService } from 'src/app/web/services/giros.service';
import { Puerto } from 'src/app/web/models/puertos';
import { PuertosService } from 'src/app/web/services/puertos.service';
import { Router } from '@angular/router';
import { Trafico } from 'src/app/web/models/trafico';
import { TraficoService } from 'src/app/web/services/trafico.service';

@Component({
  selector: 'app-form-entrada',
  templateUrl: './form-entrada.component.html',
  styleUrls: ['./form-entrada.component.css'],
  providers: [
    // The locale would typically be provided on the root module of your application. We do it at
    // the component level here, due to limitations of our example generation script.
    {provide: MAT_DATE_LOCALE, useValue: 'es-Es'},
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },
    {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS},
  ],
})
export class FormEntradaComponent implements OnInit {
  date = new FormControl(new Date());
  entradas: Array<Entrada>;

  // Buques
  buquesService: BuquesService;
  buques: Array<Buques>;
  // Agencias
  agenciasService: AgenciasService;
  agencias: Array<Agencias>;
  // Puertos
  puertosService: PuertosService;
  puertos: Array<Puerto>;
  // Giros
  girosService: GirosService;
  giros: Array<Giros>;
  // Trafico
  traficoService: TraficoService;
  traficos: Array<Trafico>;
  // Entradas
  entradaKey: string;
  entradasService: EntradasService;
  entradaInEdition: Entrada;
  isNew: boolean;
  siteMapLabel: string;
  showSpinner = true;
  constructor( private router: Router,
               public dialog: MatDialog,
               serviceBuques: BuquesService,
               serviceAgencias: AgenciasService,
               servicePuertos: PuertosService,
               serviceGiros: GirosService,
               serviceTrafico: TraficoService,
               serviceEntrada: EntradasService, ) {
      this.buquesService = serviceBuques;
      this.agenciasService = serviceAgencias;
      this.puertosService = servicePuertos;
      this.girosService = serviceGiros;
      this.traficoService = serviceTrafico;
      this.entradasService = serviceEntrada;
      this.entradaInEdition = null;
      this.buques = null;
      this.agencias = null;
      this.puertos = null;
      this.traficos = null;
      this.giros = null;
      this.entradas = null;
    }
  navigateTo(value, id) {
    if (value === 'AgregarBuque' || value === 'AgregarAgencia') {
        this.router.navigate([`cgpds/${value}/${id}`]);
    }
    return false;
  }
  ngOnInit() {
    this.setupFormNewEntrada();
    const scope = this;
    // tslint:disable-next-line: only-arrow-functions
    this.entradasService.getEntradas(function(entradas) {
      scope.entradas = entradas;
    });
    // tslint:disable-next-line: only-arrow-functions
    this.buquesService.getBuques(function(buques) {
      scope.buques = buques;
    });
// tslint:disable-next-line: only-arrow-functions
    this.agenciasService.getAgencias(function(agencias) {
      scope.agencias = agencias;
    });
// tslint:disable-next-line: only-arrow-functions
    this.puertosService.getPuertos(function(puertos) {
      scope.puertos = puertos;
    });
    // tslint:disable-next-line: only-arrow-functions
    this.girosService.getGiros(function(giros) {
      scope.giros = giros;
    });
    // tslint:disable-next-line: only-arrow-functions
    this.traficoService.getTraficos(function(traficos) {
      scope.traficos = traficos;
    });
  }
  setupFormEditEntrada() {
    this.isNew = false;
    this.entradasService.getEntrada(this.entradaKey, data => {
      this.entradaInEdition = new Entrada(data);
      console.log(this.entradaInEdition.id);
    });
  }

  setupFormNewEntrada() {
    this.isNew = true;
    this.entradaInEdition = new Entrada({
      id: '',
      giro: '',
      buque: '',
      agencia: '',
      procedencia: '',
      destino: '',
      entrada: new Date(),
      salida: new Date(),
      trafico: '',
      muelle: '',
      documento: '',
      nroPasavante: '',
      cal_ent: '',
      cal_sal: '',
      envase_desc: '',
      empresa_desc: '',
      carga: '',
      tns_carga: '',
      envase_carg: '',
      empresa_car: '',
      cal_ent1: '',
      cal_sal1: '',
      tipo: ''
    });
  }
}
