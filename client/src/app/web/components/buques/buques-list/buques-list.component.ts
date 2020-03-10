import { Arboladura, Bandera, Trafico } from "src/app/web/models/simpleData";
import { Component, OnInit, ViewChild } from "@angular/core";
import {
  MatPaginator,
  MatSort,
  MatTable,
  MatTableDataSource
} from "@angular/material";

import { AditionalService } from "src/app/web/services/adicional.service";
import { Agencias } from "src/app/web/models/agencias";
import { AgenciasService } from "src/app/web/services/agencias.service";
import { Buques } from "src/app/web/models/buques";
import { BuquesService } from "src/app/web/services/buques.service";
import { Entrada } from 'src/app/web/models/entradas';
import { EntradasService } from "src/app/web/services/entradas.service";
import { Giros } from "src/app/web/models/giros";
import { Puerto } from "src/app/web/models/puertos";
import listaDeAgencias from "src/assets/json/agencias.json";
import listaDeArboladura from "src/assets/json/arboladura.json";
import listaDeBanderas from "src/assets/json/bandera.json";
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
export interface Documento{
  id: number,
  documento: string
}
@Component({
  selector: "app-buques-list",
  templateUrl: "./buques-list.component.html",
  styleUrls: ["./buques-list.component.css"]
})
export class BuquesListComponent implements OnInit {
  entradas: Array<Entrada> = listaDeEntradas;
  buqueSelect: Buques;
  bandera: Bandera;
  arboladura: Arboladura;
  buques: Array<Buques> = listaDeBuques;
  arboladuras: Array<Arboladura> = listaDeArboladura;
  banderas: Array<Bandera> = listaDeBanderas;
  displayedColumnsBuque: string[] = [
    "ORDEN",
    "BANDERA",
    "ARBOLADURA",
    "IMO",
    "ESLORA",
    "MANGA",
    "TRN",
    "TRB"
  ];
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
  entradasFiltradas: DataTable[];
  dataSource: MatTableDataSource<DataTable>;
  agencias: Array<Agencias> = listaDeAgencias;
  puertos: Array<Puerto> = listaDePuertos;
  giros: Array<Giros> = listaDeGiros;
  traficos: Array<Trafico> = listaDeTrafico;
  documentos:  Array<Documento> = listaDoc;

  @ViewChild(MatTable, { static: true }) table: MatTable<any>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private serviceBuques: BuquesService,
    private serviceAditional: AditionalService,
    private serviceEntrada: EntradasService,
    private serviceAgencias: AgenciasService
  ) {

  }

  ngOnInit() {
    const scope = this;
    this.serviceEntrada.getEntradas(function(entradas) {
      scope.entradas = entradas;
    });
    this.serviceAditional.getArboladuras(function(arboladuras) {
      scope.arboladuras = arboladuras;
    });
    this.serviceBuques.getBuques(function(buques) {
      scope.buques = buques;
    });
    this.serviceAditional.getBanderas(function(banderas) {
      scope.banderas = banderas;
    });

    this.serviceAgencias.getAgencias(function(agencias) {
      scope.agencias = agencias;
    });
    this.serviceAditional.getPuertos(function(puertos) {
      scope.puertos = puertos;
    });
    this.serviceAditional.getGiros(function(giros) {
      scope.giros = giros;
    });
    this.serviceAditional.getTraficos(function(traficos) {
      scope.traficos = traficos;
    });



    this.buqueSelect=new Buques({
      key: "",
      orden: "",
      nombre: "",
      cuit: "",
      bandera: "",
      arboladura: "",
      eslora: "",
      manga: "",
      puntal: "",
      trn: "",
      trb: "",
      imo: ""
    });


  }

  completeTable() {
    let data= this.entradas.filter(e => e.buque == this.buqueSelect.orden);
    let table: any = [];
    let tra = "",doc="",
      mue = "",
      buq = "",
      des = "",
      proc = "",
      age = ""

    for (const element of data) {

      if (this.buques.find(b => b.orden == element.buque) != undefined) {
        buq = this.buques.find(b => b.orden == element.buque).nombre;
      }
      if (this.agencias.find(a => a.orden == element.agencia) != undefined) {
        age = this.agencias.find(a => a.orden == element.agencia).agencia;
      }
      if (this.puertos.find(p => p.orden == element.procedencia) != undefined) {
        proc = this.puertos.find(p => p.orden == element.procedencia).puerto;
      }
      if (this.puertos.find(p => p.orden ==element.destino) != undefined) {
        des = this.puertos.find(p => p.orden == element.destino).puerto;
      }

      if (this.documentos.find(b => b.id === element.documento) != undefined) {
        doc = this.documentos.find(d => d.id === element.documento).documento;

      }
      if (element.trafico != null) {
        if (this.traficos.find(p => p.id == element.trafico) != undefined) {
          tra = this.traficos.find(p => p.id == element.trafico).trafico;
        }
      }
      if (element.muelle != null) {
        if (this.giros.find(p => p.orden == element.muelle) != undefined) {
          mue = this.giros.find(p => p.orden == element.muelle).muelle;
        }
      }

      table.push({
        id: element.id,
        giro: element.giro,
        buque: buq,
        agencia: age,
        procedencia: proc,
        destino: des,
        entrada: element.entrada,
        salida: element.salida,
        muelle: mue,
        trafico: tra,
        documento: doc,
        nroPasavante: element.nroPasavante,
        cal_ent: element.cal_ent,
        cal_sal: element.cal_sal
      });
    }
    return table;
  }


  vacio() {
    return !(this.buqueSelect.nombre === "");
  }
  navigateToEdits(id) {
    window.open(`cgpds/EditarBuque/${id}`, "_blank");
  }
  cargarDatosBuque() {
    this.bandera = this.banderas.find(
      b => b.orden === this.buqueSelect.bandera
    );
    this.arboladura = this.arboladuras.find(
      b => b.codigo === this.buqueSelect.arboladura
    );
    this.dataSource = new MatTableDataSource(this.completeTable());
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
