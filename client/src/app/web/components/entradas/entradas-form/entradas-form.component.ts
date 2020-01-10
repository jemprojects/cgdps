import { Component, OnInit } from '@angular/core'

import { Agencias } from 'src/app/web/models/agencias';
import { AgenciasService } from 'src/app/web/services/agencias.service';
import { Buques } from 'src/app/web/models/buques';
import { BuquesService } from 'src/app/web/services/buques.service';
import { MatDialog } from '@angular/material';
import { PuertosService } from 'src/app/web/services/puertos.service'

@Component({
  selector: 'app-entradas-form',
  templateUrl: './entradas-form.component.html',
  styleUrls: ['./entradas-form.component.css'],
})
export class EntradasFormComponent implements OnInit {
  buquesService: BuquesService;
  buques: Array<Buques>;
  selectedBuque: string;
  agenciasService: AgenciasService;
  agencias: Array<Agencias>
  selectedAgencia: string
  puertosService: PuertosService;
  puertos: Array<Agencias>
  selectedPuerto: string

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
