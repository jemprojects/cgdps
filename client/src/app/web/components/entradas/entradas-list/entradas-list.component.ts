import { Component, HostListener, Input, OnInit, ViewChild } from "@angular/core";
import { MatPaginator, MatSort, MatTableDataSource } from "@angular/material";

import { AditionalService } from "src/app/web/services/adicional.service";
import { Agencias } from "src/app/web/models/agencias";
import { AgenciasService } from "src/app/web/services/agencias.service";
import { Buques } from "src/app/web/models/buques";
import { BuquesService } from "src/app/web/services/buques.service";
import { DataRowOutlet } from "@angular/cdk/table";
import { DatePipe } from '@angular/common';
import { Entrada } from "src/app/web/models/entradas";
import { EntradasService } from "src/app/web/services/entradas.service";
import { FormControl } from "@angular/forms";
import { FormEntradaComponent } from "../../Formularios/form-entrada/form-entrada.component";
import { Giros } from "src/app/web/models/giros";
import { Puerto } from "src/app/web/models/puertos";
import { ThrowStmt } from '@angular/compiler';
import { Trafico } from "src/app/web/models/simpleData";
import { filter } from "@angular-devkit/schematics";
import listaDeAgencias from "src/assets/json/agencias.json";
import listaDeBuques from "src/assets/json/buques.json";
import listaDeEntradas from "src/assets/json/entradas.json";
import listaDeGiros from "src/assets/json/giros.json";
import listaDePuertos from "src/assets/json/puertos.json";
import listaDeTrafico from "src/assets/json/trafico.json";
import listaDoc from "src/assets/json/documento.json";

export class DataTable {
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
export class EntradasListComponent implements OnInit {
  @Input() formEnt: FormEntradaComponent;
  @Input() formularioAbierto: boolean;
  entradas: Array<Entrada> = listaDeEntradas;
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
    "nroPasavante"
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
  ultima:Entrada
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  dataSource: MatTableDataSource<DataTable>;
  checked = false;
  constructor(
    private service: EntradasService,
    private serviceBuque: BuquesService,
    private serviceAgencia: AgenciasService,
    private serviceAdicional: AditionalService
  ) {
    this.entradasFiltradas = null;
    this.dataSource = new MatTableDataSource(this.completeTable());
  }
  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    const scope = this;
    this.service.getEntradas(function(entradas) {
      scope.entradas = entradas;
      scope.ultima= scope.entradas.pop()
      console.log(scope.ultima)
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
  }
  completeTable() {
    let table: DataTable[] = [];
    Object.entries(this.entradas).forEach(([_, value]) => {
      let data = new DataTable();
      // tslint:disable-next-line: no-unused-expression
      Object.entries(value).forEach(([key, dato]) => {
        if (key == "id") {
          data.giro = value.id;
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
          data.agencia = this.agencias.find(
            b => b.orden == value.agencia
          ).agencia;
        }
        if (key == "procedencia") {
          data.procedencia = this.puertos.find(
            b => b.orden == value.procedencia).puerto;
        }
        if (key == "destino") {
          data.destino = this.puertos.find(
            b => b.orden == value.destino).puerto;
        }
        if (key == "trafico") {
          data.trafico = this.traficos.find(
            b =>
              b.id == value.trafico ||
              value.trafico === 0 ||
              value.trafico == null
          ).trafico;
        }
        if (key == "documento") {
          data.documento = this.documentos.find(
            b =>
              b.id == value.documento ||
              value.documento === 0
          ).documento;
        }
        if (key == "muelle") {
          data.muelle = this.giros.find(
            b =>
              b.orden == value.muelle || value.muelle === 0
          ).muelle;
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
      if (data != undefined) {
        table.push(data);
      }
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
}
