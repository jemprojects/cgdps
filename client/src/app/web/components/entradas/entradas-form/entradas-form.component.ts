import { Component, OnInit } from '@angular/core'

import { Agencias } from 'src/app/web/models/agencias';
import { AgenciasService } from 'src/app/web/services/agencias.service';
import { Buques } from 'src/app/web/models/buques';
import { BuquesService } from 'src/app/web/services/buques.service';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-entradas-form',
  templateUrl: './entradas-form.component.html',
  styleUrls: ['./entradas-form.component.css'],
})
export class EntradasFormComponent implements OnInit {
  buquesService: BuquesService;
  buques: Array<Buques>;
  selectedBuque: string;
  agenciaService: AgenciasService;
  agencias: Array<Agencias>
  selectedAgencia: string

  constructor(public dialog: MatDialog, serviceBuques: BuquesService, serviceAgencias: AgenciasService) {
    this.buquesService = serviceBuques;
    this.agenciaService = serviceAgencias;
  }
  ngOnInit() {
    var scope = this
    // tslint:disable-next-line: only-arrow-functions
    this.buquesService.getBuques(function(buques) {
      scope.buques = buques
    })
    this.agenciaService.getAgencias(function(agencias){
      scope.agencias = agencias
    })
  }
}
