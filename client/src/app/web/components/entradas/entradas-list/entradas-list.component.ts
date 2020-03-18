import { AfterViewInit, ChangeDetectorRef, Component, HostListener, Input, OnInit, ViewChild } from "@angular/core";
import { MatPaginator, MatSort, MatTableDataSource } from "@angular/material";
import {animate, state, style, transition, trigger} from '@angular/animations';

import { AditionalService } from "src/app/web/services/adicional.service";
import { Agencias } from "src/app/web/models/agencias";
import { AgenciasService } from "src/app/web/services/agencias.service";
import { Buques } from "src/app/web/models/buques";
import { BuquesService } from "src/app/web/services/buques.service";
import { ConsultasComponent } from '../../consultas/consultas.component';
import { Entrada } from "src/app/web/models/entradas";
import { EntradasService } from "src/app/web/services/entradas.service";
import { FormControl } from "@angular/forms";
import { FormEntradaComponent } from "../../Formularios/form-entrada/form-entrada.component";
import { Giros } from "src/app/web/models/giros";
import { Puerto } from "src/app/web/models/puertos";
import { Router } from '@angular/router';
import { Trafico } from "src/app/web/models/simpleData";
import listaDeAgencias from "src/assets/json/agencias.json";
import listaDeBuques from "src/assets/json/buques.json";
import listaDeEntradas from "src/assets/json/entradas.json";
import listaDeGiros from "src/assets/json/giros.json";
import listaDePuertos from "src/assets/json/puertos.json";
import listaDeTrafico from "src/assets/json/trafico.json";
import listaDoc from "src/assets/json/documento.json";

export class DataTable {
  key:string | number;
  id: number;
  giro: number;
  buque: string;
  agencia: string;
  procedencia: string;
  destino: string;
  entrada: Date;
  salida: Date;
  muelle: string;
  trafico: string;
  documento: string;
  nroPasavante: number;
  cal_ent: number;
  cal_sal: number;
}
@Component({
  selector: "app-entradas-list",
  templateUrl: "./entradas-list.component.html",
  styleUrls: ["./entradas-list.component.css"]
})
export class EntradasListComponent implements OnInit, AfterViewInit {
  @Input() formEnt: FormEntradaComponent;
  @Input() formularioAbierto: boolean;
  entradas: Array<Entrada>
  displayedColumns: string[] = [
    "giro",
    "buque",
    "agencia",
    "procedencia",
    "destino",
    "entrada",
    "salida",
    "muelle",
    "trafico",
    "documento",
    "nroPasavante", "accion"
  ];

  columnsToDisplay: string[] = this.displayedColumns.slice();
  resultsLength: number;
  buques: Array<Buques> = listaDeBuques;
  agencias: Array<Agencias> = listaDeAgencias;
  puertos: Array<Puerto> = listaDePuertos;
  giros: Array<Giros> = listaDeGiros;
  traficos: Array<Trafico> = listaDeTrafico;
  documentos: any = listaDoc;
  search = new FormControl("");
  entradasFiltradas: DataTable[];


  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(ConsultasComponent,{ static: false }) consult: ConsultasComponent
  dataSource: MatTableDataSource<DataTable>;

  checked = false;


  constructor(
    private service: EntradasService,
    private serviceBuque: BuquesService,
    private serviceAgencia: AgenciasService,
    private serviceAdicional: AditionalService,
    private route: Router,
    private cd: ChangeDetectorRef,
  ) {
    this.entradasFiltradas = null;
    this.entradas=null

  }
  ngAfterViewInit(): void {

    this.dataSource = new MatTableDataSource(this.completeTable(this.entradas));
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

     this.cd.detectChanges();

  }
  ngOnInit() {
    const scope = this;
    this.service.getEntradas(function(entradas) {
      scope.entradas = entradas;
    });

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

    this.dataSource = new MatTableDataSource(this.completeTable(this.entradas));
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;


  }

  completeTable(entradas :Entrada[]) {
    let table: DataTable[] = [];
    Object.entries(entradas).forEach(([_, value]) => {
      let data = new DataTable();
      data.key = value.key
      Object.entries(value).forEach(([key, _]) => {

        if (key == "id") {
          data.id = value.id;
        }
        if (key == "giro") {
          data.giro = value.giro;
        }
        if (key == "entrada") {
          data.entrada = value.entrada;
        }
        if (key == "salida") {
          data.salida = value.salida;
        }
        if (key == "buque") {
          data.buque = this.buques.find(b => b.orden == value.buque).nombre;
        }
        if (key == "agencia") {
        if( this.agencias.find(b => b.orden == value.agencia) != undefined){
          data.agencia = this.agencias.find(
            b => b.orden == value.agencia
          ).agencia;
        }

        }
        if (key == "procedencia") {
          if(this.puertos.find(b => b.orden == value.procedencia) != undefined){
            data.procedencia = this.puertos.find(b => b.orden == value.procedencia).puerto;
          }
        }
        if (key == "destino") {
          if(this.puertos.find(b => b.orden == value.destino)!= undefined){
            data.destino = this.puertos.find(b => b.orden == value.destino).puerto;
          }
        }
        if (key == "trafico") {
          if( this.traficos.find(b => b.id == value.trafico) != undefined ){
          data.trafico = this.traficos.find(
            b =>
              b.id == value.trafico ||
              value.trafico === 0 ||
              value.trafico == null
          ).trafico;
        }
        }
        if (key == "documento") {
          if(this.documentos.find(b =>b.id === value.documento) != undefined ){
            data.documento = this.documentos.find(b => b.id === value.documento).documento;
          }

        }
        if (key == "muelle") {
          if(this.giros.find(b =>b.orden == value.muelle)!= undefined){
            data.muelle = this.giros.find(b =>b.orden == value.muelle).muelle;
          }

        }
        if (key == "nroPasavante") {
          data.nroPasavante = value.nroPasavante;
        }
        if (key == "cal_ent") {
          data.cal_ent = value.cal_ent;
        }
        if (key == "cal_sal") {
          data.cal_sal = value.cal_sal;
        }
      });
      table.push(data);
    });
    return table;
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  navigateToEdits(id) {
    this.route.navigate([`cgpds/entrada/${id}`]);
  }
}
