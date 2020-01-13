import { Component, OnInit } from '@angular/core'
import { MAT_DATE_FORMATS, MatDialog } from '@angular/material';

import { Agencias } from 'src/app/web/models/agencias';
import { AgenciasService } from 'src/app/web/services/agencias.service';
import { Buques } from 'src/app/web/models/buques';
import { BuquesService } from 'src/app/web/services/buques.service';
import { FormControl } from '@angular/forms';
import { PuertosService } from 'src/app/web/services/puertos.service'

export const DD_MM_YYYY_Format = {
  parse: {
      dateInput: 'LL',
  },
  display: {
      dateInput: 'DD/MM/YYYY',
      monthYearLabel: 'MMM YYYY',
      dateA11yLabel: 'LL',
      monthYearA11yLabel: 'MMMM YYYY',
  },
};
@Component({
  selector: 'app-entradas-form',
  templateUrl: './entradas-form.component.html',
  styleUrls: ['./entradas-form.component.css'],
  providers: [
    {provide: MAT_DATE_FORMATS, useValue: DD_MM_YYYY_Format},
]
})

export class EntradasFormComponent implements OnInit {
  buquesService: BuquesService;
  buques: Array<Buques>;
  entrada = new FormControl(new Date())
  salida = new FormControl(new Date())
  agenciasService: AgenciasService;
  agencias: Array<Agencias>

  puertosService: PuertosService;
  puertos: Array<Agencias>

  selectedProcendencia: string
  selectedDestino: string
  selectedBuque: string;
  selectedAgencia: string



  constructor(public dialog: MatDialog, serviceBuques: BuquesService, serviceAgencias: AgenciasService,servicePuertos: PuertosService) {
    this.buquesService = serviceBuques;
    this.agenciasService = serviceAgencias;
    this.puertosService = servicePuertos
  }
  ngOnInit() {
    var scope = this

    // tslint:disable-next-line: only-arrow-functions
    this.buquesService.getBuques(function(buques) {
      scope.buques = buques
    })
    this.agenciasService.getAgencias(function(agencias){
      scope.agencias = agencias
    })
    this.puertosService.getPuertos(function(puertos){
      scope.puertos = puertos

    })
  }



}

