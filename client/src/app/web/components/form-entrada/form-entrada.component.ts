import { Component, OnInit } from '@angular/core';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material';
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
import { Router } from '@angular/router';
import listaDeGiros from 'src/assets/json/giros.json';
import listaDePuertos from 'src/assets/json/puertos.json';
import listaDeTrafico from 'src/assets/json/trafico.json';

@Component({
  selector: 'app-form-entrada',
  templateUrl: './form-entrada.component.html',
  styleUrls: ['./form-entrada.component.css'],
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
export class FormEntradaComponent implements OnInit {
  entradas: Array<Entrada>;
  // Listas
  buques: Array<Buques>;
  puertos: any=listaDePuertos;
  agencias: Array<Agencias>
  giros: any=listaDeGiros;
  traficos: any=listaDeTrafico;
  buqueSelect: Buques
  // Entradas
  entradaKey: string;
  entradaInEdition: Entrada;
  isNew: boolean;
  siteMapLabel: string;
  // Servicios
  service: EntradasService;
  serviceBuque: BuquesService
  serviceAgencia: AgenciasService
  constructor( private router: Router,
    serviceEntrada: EntradasService,
    serviceBuque: BuquesService,
    serviceAgencia: AgenciasService) {
    this.entradaInEdition = null;
    this.service = serviceEntrada;
    this.serviceAgencia= serviceAgencia;
    this.serviceBuque= serviceBuque;
    this.entradas = null;
    this.buques=[]
  }
  navigateTo(value, id) {
    if (value === 'AgregarBuque' || value === 'AgregarAgencia') {
    this.router.navigate([`cgpds/${value}/${id}`]);
    }
    else{
      this.buqueSelect=new Buques(this.buques.find(b=>b.orden==this.entradaInEdition.buque))
    }
    return false;
  }

  ngOnInit() {
    const scope = this;
    this.serviceBuque.getBuques(function(buques) {
    scope.buques = buques
    });
    this.serviceAgencia.getAgencias(function(agencias) {
    scope.agencias = agencias
    });
    this.setupFormNewEntrada();


  }

  setupFormEditEntrada() {
    this.isNew = false;
    this.service.getEntrada(this.entradaKey, data => {
    this.entradaInEdition = new Entrada(data);
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
