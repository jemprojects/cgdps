import { Component, HostListener, Input, OnInit, ViewChild } from '@angular/core';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material';
import {
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
  MAT_MOMENT_DATE_FORMATS,
  MomentDateAdapter,
} from '@angular/material-moment-adapter';

import { AditionalService } from 'src/app/web/services/adicional.service';
import { Agencias } from 'src/app/web/models/agencias';
import { AgenciasService } from 'src/app/web/services/agencias.service';
import { Buques } from 'src/app/web/models/buques';
import { BuquesService } from 'src/app/web/services/buques.service';
import { DialogAddPGComponent } from '../../popUp/dialog-add-pg/dialog-add-pg.component';
import { DialogComponent } from '../../popUp/dialog/dialog.component';
import { Entrada } from 'src/app/web/models/entradas';
import { EntradasService } from 'src/app/web/services/entradas.service';
import { FormCargaComponent } from '../form-carga/form-carga.component';
import { Giros } from 'src/app/web/models/giros';
import { MatDialog } from '@angular/material';
import { OperacionesComponent } from '../../operaciones/operaciones.component';
import { OperacionsService } from '../../../services/operacion.service';
import { Puerto } from 'src/app/web/models/puertos';
import { Router } from '@angular/router';
import { ServiciosPortuariosComponent } from '../../servicios-portuarios/servicios-portuarios.component';
import { Trafico } from 'src/app/web/models/simpleData';
import listaDeBuques from 'src/assets/json/buques.json';
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
  @ViewChild(ServiciosPortuariosComponent, {static: true}) tab: ServiciosPortuariosComponent;
  @ViewChild(OperacionesComponent, {static: true}) operaciones: OperacionesComponent;

  entradas: Array<Entrada>;
  // Listas
  buques: Array<Buques>=listaDeBuques;
  agencias: Array<Agencias>;
  orden_count: number;
  puertos: Array<Puerto> = listaDePuertos;
  giros: Array<Giros> = listaDeGiros;
  traficos: Array<Trafico> = listaDeTrafico;
  buqueSelect: Buques;
  // Entradas
  entradaKey: string;
  entradaInEdition: Entrada;
  isNew: boolean;
  siteMapLabel: string;
  // Servicios
  service: EntradasService;
  serviceBuque: BuquesService;
  serviceAgencia: AgenciasService;
  serviceAdicional: AditionalService;
  dataSelect: {id: number, name: string, name2: string};
  dataSimple: {id: number, name: string};
  checked = false;

  @Input() sideBar: FormCargaComponent;

  @HostListener('click')
  click() {
    this.sideBar.toggle();
    this.entradaInEdition.giro=this.sideBar.nroGiroE
  }


  constructor( public dialog: MatDialog,
               serviceEntrada: EntradasService,
               serviceBuque: BuquesService,
               serviceAgencia: AgenciasService,
               serviceAdit: AditionalService
               ) {
    this.entradaInEdition = null;
    this.serviceAdicional = serviceAdit;
    this.service = serviceEntrada;
    this.serviceAgencia = serviceAgencia;
    this.serviceBuque = serviceBuque;
    this.entradas = null;
    this.buques = [];
    this.buqueSelect = null;

  }

  navigateTo(value) {
    if (value === 'AgregarBuque' || value === 'AgregarAgencia') {
      window.open(`cgpds/${value}/null`, '_blank');
    } else if (value === 'AgregarPuerto') {
      const dialogRef = this.dialog.open(DialogAddPGComponent, {
        width: '250px',
        data: {data: this.dataSelect, title: 'Puerto'},
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result.event === 'Add') {
          this.addPuerto(result.data);
        }

      });
    }  else if (value === 'AgregarGiro') {
      const dialogRef = this.dialog.open(DialogAddPGComponent, {
        width: '250px',
        data: {data: this.dataSelect, title: 'Giro'},
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result.event === 'Add') {
          this.addGiro(result.data);
        }

      });
    } else if (value === 'AgregarTrafico') {
      const dialogRef = this.dialog.open(DialogComponent, {
        width: '250px',
        data: {data: this.dataSimple, title: 'Trafico'},

      });

      dialogRef.afterClosed().subscribe(result => {
        if (result.event === 'Add') {
          this.addTrafico(result.data);
        }

      });
    } else {
      // tslint:disable-next-line: triple-equals
      this.buqueSelect = this.buques.find(b => b.orden == this.entradaInEdition.buque);


    }
    return false;
  }
  addPuerto(row_obj) {
    this.orden_count = this.puertos[this.puertos.length - 1].orden + 1;

    this.serviceAdicional.createPuerto({orden: this.orden_count,
      puerto: row_obj.name.toUpperCase(),
      pais: row_obj.name2.toUpperCase()}, () => {});
  }
  addGiro(row_obj) {
    this.orden_count = this.giros[this.giros.length - 1].orden + 1;
    this.serviceAdicional.createGiro({orden: this.orden_count,
      muelle: row_obj.name.toUpperCase(),
      sector: row_obj.name2.toUpperCase()}, () => {});
  }
  addTrafico(row_obj) {
    this.orden_count = this.traficos[this.traficos.length - 1].id + 1;
    this.serviceAdicional.createTrafico({'id': this.orden_count, 'trafico': row_obj.name.toUpperCase()}, () => {});
  }
  navigateToEdits(id) {
    window.open(`cgpds/EditarBuque/${id}`, '_blank');
  }

  ngOnInit() {
    const scope = this;
    this.serviceBuque.getBuques(function(buques) {
      scope.buques = buques;
    });
    this.serviceAgencia.getAgencias(function(agencias) {
      scope.agencias = agencias;
    });
    this.serviceAdicional.getPuertos(function(puertos) {
      scope.puertos = puertos;
    });
    this.serviceAdicional.getGiros(function(giros) {
      scope.giros = giros;
    });
    this.serviceAdicional.getTraficos(function(traficos) {
      scope.traficos = traficos;
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
    giro: this.sideBar.nroGiroE,
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

    });
  }
  saveEntrada(entrada) {

    if (this.checked) {
      this.service.createEntrada(entrada, () => {});
    }

  }
}
