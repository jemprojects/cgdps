import { Component, OnInit, ViewChild } from '@angular/core';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material';
import {
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
  MAT_MOMENT_DATE_FORMATS,
  MomentDateAdapter,
} from '@angular/material-moment-adapter';
import { MatDialog, MatSort, MatTable } from '@angular/material';

import { Agencias } from 'src/app/web/models/agencias';
import { AgenciasService } from 'src/app/web/services/agencias.service';
import { Buques } from 'src/app/web/models/buques';
import { BuquesService } from 'src/app/web/services/buques.service';
import { DialogBoxComponent } from '../dialog-box/dialog-box.component';
import { Entrada } from 'src/app/web/models/entradas';
import { EntradasService } from 'src/app/web/services/entradas.service';
import { FormControl } from '@angular/forms';
import { Operacion } from '../../models/operacion';
import { OperacionesComponent } from '../operaciones/operaciones.component';
import { OperacionsService } from '../../services/operacion.service';
import { Router } from '@angular/router';
import listaDeGiros from 'src/assets/json/giros.json';
import listaDeMercaderias from 'src/assets/json/mercaderias.json';
import listaDePuertos from 'src/assets/json/puertos.json';
import listaDeTipos from 'src/assets/json/tipo.json';
import listaDeTrafico from 'src/assets/json/trafico.json';

export interface EmpData {
  id: number;
  empresa: string;
  rubro: string;
}

const ELEMENT_DATA: EmpData[] = [
];
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
  title='EMPRESAS DE SERVICIOS PORTUARIOS QUE OPERAN EN EL BUQUE'
  displayedColumns: string[] = ['rubro', 'empresa', 'action'];
  dataSource = ELEMENT_DATA;
  id_count: number=0
  @ViewChild(MatTable, {static: true}) table: MatTable<any>;

  entradas: Array<Entrada>;
  // Listas
  buques: Array<Buques>;
  puertos: any = listaDePuertos;
  agencias: Array<Agencias>;
  giros: any = listaDeGiros;
  traficos: any = listaDeTrafico;
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
  operationService: OperacionsService;
  // operaciones
  impo: Operacion;
  expo: Operacion;
  // Mercadeira
  mercaderias: any = listaDeMercaderias;
  // tipos
  tipos: any = listaDeTipos;
  constructor( public dialog: MatDialog,
               private router: Router,
               serviceEntrada: EntradasService,
               serviceBuque: BuquesService,
               serviceAgencia: AgenciasService,
               Oservice: OperacionsService) {
    this.entradaInEdition = null;
    this.service = serviceEntrada;
    this.serviceAgencia = serviceAgencia;
    this.serviceBuque = serviceBuque;
    this.operationService = Oservice;
    this.impo = null;
    this.expo = null;
    this.entradas = null;
    this.buques = [];
    this.buqueSelect = null;
  }
  navigateTo(value, id) {
    if (value === 'AgregarBuque' || value === 'AgregarAgencia') {
    this.router.navigate([`cgpds/${value}/${id}`]);
    } else {
      this.buqueSelect = this.buques.find(b => b.orden == this.entradaInEdition.buque);
    }
    return false;
  }

  ngOnInit() {
    const scope = this;
    this.serviceBuque.getBuques(function(buques) {
    scope.buques = buques;
    });
    this.serviceAgencia.getAgencias(function(agencias) {
    scope.agencias = agencias;
    });
    this.setupFormNewOperation();
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
  getTotal(n1, n2) {
    return parseInt(n1) + parseInt(n2);
  }
  setupFormNewOperation() {
    this.impo = new Operacion({
      id: '',
      mercaderia: '',
      tns: 0,
      tipo: '',
      giro_id: ''
    });
    this.expo = new Operacion({
      id: '',
      mercaderia: '',
      tns: 0,
      tipo: '',
      giro_id: ''
    });
  }

  openDialog(action,obj) {
    obj.action = action;
    const dialogRef = this.dialog.open(DialogBoxComponent, {
      width: '250px',
      data:obj
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result.event == 'Add'){
        this.addRowData(result.data);
      }else if(result.event == 'Update'){
        this.updateRowData(result.data);
      }else if(result.event == 'Delete'){
        this.deleteRowData(result.data);
      }
    });
  }

  addRowData(row_obj){
    this.dataSource.push({
      id:this.id_count++,
      rubro:row_obj.rubro,
      empresa:row_obj.empresa,
    });
    this.table.renderRows();
  }
  updateRowData(row_obj){
    this.dataSource = this.dataSource.filter((value,key)=>{
      if(value.id == row_obj.id){
        value.rubro=row_obj.rubro
        value.empresa = row_obj.empresa;
      }
      return true;
    });
  }
  deleteRowData(row_obj){
    this.dataSource = this.dataSource.filter((value,key)=>{
      return value.rubro != row_obj.rubro;
    });
  }

}
