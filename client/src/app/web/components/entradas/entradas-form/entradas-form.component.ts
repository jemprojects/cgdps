import { Component, OnInit } from '@angular/core';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, MatDialog } from '@angular/material';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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
import { Giros } from 'src/app/web/models/giros';
import { GirosService } from 'src/app/web/services/giros.service';
import { Mercaderia } from 'src/app/web/models/mercaderia';
import { MercaderiasService } from 'src/app/web/services/mercaderias.service';
import { PuertosService } from 'src/app/web/services/puertos.service';
import { Trafico } from 'src/app/web/models/trafico';
import { TraficoService } from 'src/app/web/services/trafico.service';

@Component({
  selector: 'app-entradas-form',
  templateUrl: './entradas-form.component.html',
  styleUrls: ['./entradas-form.component.css'],
  providers: [
    // The locale would typically be provided on the root module of your application. We do it at
    // the component level here, due to limitations of our example generation script.
    {provide: MAT_DATE_LOCALE, useValue: 'es-Es'},

    // `MomentDateAdapter` and `MAT_MOMENT_DATE_FORMATS` can be automatically provided by importing
    // `MatMomentDateModule` in your applications root module. We provide it at the component level
    // here, due to limitations of our example generation script.
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },
    {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS},
  ],
})
export class EntradasFormComponent implements OnInit {
  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  date= new FormControl(new Date());
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
  // Mercadeira
  mercaderiaService: MercaderiasService;
  mercaderias: Array<Mercaderia>;

  // Entradas
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
    serviceTrafico: TraficoService,
    serviceMercaderia: MercaderiasService,
    private _formBuilder: FormBuilder,
  ) {
    this.buquesService = serviceBuques;
    this.agenciasService = serviceAgencias;
    this.puertosService = servicePuertos;
    this.girosService = serviceGiros;
    this.traficoService = serviceTrafico;
    this.entradaInEdition = null;
    this.mercaderiaService = serviceMercaderia
  }
  ngOnInit() {
    let scope = this;
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
    this.mercaderiaService.getMercaderias(function(mercaderias) {
      scope.mercaderias = mercaderias;
    });

    this.setupFormNewProvider();
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
      
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
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
