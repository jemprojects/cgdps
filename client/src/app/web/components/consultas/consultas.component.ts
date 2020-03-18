import { Component, Input, OnInit, Output, ViewChild } from "@angular/core";

import { AditionalService } from '../../services/adicional.service';
import { Agencias } from '../../models/agencias';
import { AgenciasService } from '../../services/agencias.service';
import { Buques } from '../../models/buques';
import { BuquesService } from '../../services/buques.service';
import { Entrada } from '../../models/entradas';
import { EntradasService } from '../../services/entradas.service';
import { Giros } from '../../models/giros';
import { Puerto } from '../../models/puertos';
import { Router } from '@angular/router';
import { Trafico } from '../../models/simpleData';
import listDoc from 'src/assets/json/documento.json';
import listaDeAgencias from "src/assets/json/agencias.json";
import listaDeBuques from "src/assets/json/buques.json";
import listaDeGiros from "src/assets/json/giros.json";
import listaDePuertos from "src/assets/json/puertos.json";
import listaDeTrafico from "src/assets/json/trafico.json";

@Component({
  selector: "app-consultas",
  templateUrl: "./consultas.component.html",
  styleUrls: ["./consultas.component.css"]
})
export class ConsultasComponent implements OnInit {
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
  ultima:Entrada[]
  entradas:Array<Entrada>
  buques: Array<Buques> = listaDeBuques;
  agencias: Array<Agencias>= listaDeAgencias;
  puertos: Array<Puerto> = listaDePuertos;
  giros: Array<Giros> = listaDeGiros;
  traficos: Array<Trafico> = listaDeTrafico;
  documentos:any=listDoc
  giro_id:number
  constructor(private serviceEntrada: EntradasService,
              private serviceBuque: BuquesService,
              private serviceAgencia: AgenciasService,
              private serviceAdicional: AditionalService,
              private route: Router,) {
      this.entradas=null
    }

  ngOnInit() {
    const scope=this
    this.serviceEntrada.getEntradas(function(entradas) {
      scope.entradas = entradas;
      let ult=scope.entradas.pop()
      scope.ultima=[ult]
      scope.giro_id= ult.giro

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
  completeTable(entradas) {
    let table: any = [];
    let doc = "",
      tra = "",
      mue = "",
      buq = "",
      des = "",
      proc = "",
      age = "";
    for (let entry of entradas) {
      if (entry.documento != 0) {
        if (this.documentos.find(d => d.id == entry.documento) != undefined) {
          doc = this.documentos.find(d => d.id == entry.documento).documento;
        }
      }

      if (entry.trafico != 0) {
        if (this.traficos.find(p => p.id == entry.trafico) != undefined) {
          tra = this.traficos.find(p => p.id == entry.trafico).trafico;
        }
      }
      if (entry.muelle != 0) {
        if (this.giros.find(p => p.orden == entry.muelle) != undefined) {
          mue = this.giros.find(p => p.orden == entry.muelle).muelle;
        }
      }
      if (this.buques.find(b => b.orden == entry.buque) != undefined) {
        buq = this.buques.find(b => b.orden == entry.buque).nombre;
      }
      if (this.agencias.find(a => a.orden == entry.agencia) != undefined) {
        age = this.agencias.find(a => a.orden == entry.agencia).agencia;
      }
      if (this.puertos.find(p => p.orden == entry.procedencia) != undefined) {
        proc = this.puertos.find(p => p.orden == entry.procedencia).puerto;
      }
      if (this.puertos.find(p => p.orden == entry.destino) != undefined) {
        des = this.puertos.find(p => p.orden == entry.destino).puerto;
      }

      table.push({
        key: entry.key,
        id: entry.id,
        giro: entry.giro,
        buque: buq,
        agencia: age,
        procedencia: proc,
        destino: des,
        entrada: entry.entrada,
        salida: entry.salida,
        muelle: mue,
        trafico: tra,
        documento: doc,
        nroPasavante: entry.nroPasavante,
        cal_ent: entry.cal_ent,
        cal_sal: entry.cal_sal,
        created_at: entry.created_at
      });
    }

    return table;
  }
  navigateToEdits(id) {
    console.log(id)
    this.route.navigate([`cgpds/entrada/${id}`]);
  }
}
