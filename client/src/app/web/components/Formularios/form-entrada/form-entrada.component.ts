import { ActivatedRoute, Router } from '@angular/router';
import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  HostBinding,
  Input,
  OnInit,
  ViewChild
} from "@angular/core";
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
  MatTableDataSource
} from "@angular/material";
import {
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
  MAT_MOMENT_DATE_FORMATS,
  MomentDateAdapter
} from "@angular/material-moment-adapter";

import { AditionalService } from "src/app/web/services/adicional.service";
import { Agencias } from "src/app/web/models/agencias";
import { AgenciasService } from "src/app/web/services/agencias.service";
import { Buques } from "src/app/web/models/buques";
import { BuquesService } from "src/app/web/services/buques.service";
import { DataTable } from '../../entradas/entradas-list/entradas-list.component';
import { DatePipe } from '@angular/common';
import { DialogAddPGComponent } from "../../popUp/dialog-add-pg/dialog-add-pg.component";
import { DialogComponent } from "../../popUp/dialog/dialog.component";
import { Entrada } from "src/app/web/models/entradas";
import { EntradasService } from "src/app/web/services/entradas.service";
import { Giros } from "src/app/web/models/giros";
import { MatDialog } from "@angular/material";
import { Puerto } from "src/app/web/models/puertos";
import { Trafico } from "src/app/web/models/simpleData";
import listDoc from 'src/assets/json/documento.json';
import listaDeAgencias from "src/assets/json/agencias.json";
import listaDeBuques from "src/assets/json/buques.json";
import listaDeGiros from "src/assets/json/giros.json";
import listaDePuertos from "src/assets/json/puertos.json";
import listaDeTrafico from "src/assets/json/trafico.json";

@Component({
  selector: "app-form-entrada",
  templateUrl: "./form-entrada.component.html",
  styleUrls: ["./form-entrada.component.css"],
  providers: [DatePipe,
    // The locale would typically be provided on the root module of your application. We do it at
    // the component level here, due to limitations of our example generation script.
    { provide: MAT_DATE_LOCALE, useValue: "es-Es" },

    // `MomentDateAdapter` and `MAT_MOMENT_DATE_FORMATS` can be automatically provided by importing
    // `MatMomentDateModule` in your applications root module. We provide it at the component level
    // here, due to limitations of our example generation script.
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },
    { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS }
  ]
})
export class FormEntradaComponent implements OnInit, AfterViewInit {
  ultimaCargada: string;
  isOpen:Boolean
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
  formTitle: string;
  // Listas
  buques: Array<Buques> = listaDeBuques;
  agencias: Array<Agencias>= listaDeAgencias;
  puertos: Array<Puerto> = listaDePuertos;
  giros: Array<Giros> = listaDeGiros;
  traficos: Array<Trafico> = listaDeTrafico;
  entradas:Array<Entrada>
  buqueSelect: Buques;
  // Entradas
  entradaKey: string;
  entradaInEdition: Entrada;
  isNew: boolean;
  siteMapLabel: string;
  dataSelect: { id: number; name: string; name2: string };
  dataSimple: { id: number; name: string };
  nroGiro: number=null
  documentos:any=listDoc
  @HostBinding("class.is-open")
  ultima:Entrada[]
  checked = false;
  dataSource: MatTableDataSource<DataTable>;
  constructor(
    public datepipe: DatePipe,
    public dialog: MatDialog,
    private serviceEntrada: EntradasService,
    private serviceBuque: BuquesService,
    private serviceAgencia: AgenciasService,
    private serviceAdicional: AditionalService,
    private cd: ChangeDetectorRef,
    private ruteActive: ActivatedRoute,
    private route: Router

  ) {
    this.entradaInEdition = null;
    this.buqueSelect = null;
    this.isOpen=true
    this.entradas=null
  }


  ngOnInit() {
    this.entradaKey = this.ruteActive.snapshot.paramMap.get('id');
    if (this.entradaKey === null) {
        this.setupFormNewEntrada()
      } else {
        this.setupFormEditEntrada()
      }
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
    this.serviceEntrada.getEntradas(function(entradas) {
      scope.entradas = entradas;
      scope.ultima=[scope.entradas.pop()]
      scope.nroGiro=scope.entradas[scope.entradas.length-1].giro


    });



  }

  ngAfterViewInit() {
    this.cd.detectChanges();

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
  navigateTo(value) {
    if (value === "AgregarBuque" || value === "AgregarAgencia") {
      window.open(`cgpds/${value}/null`);
    } else if (value === "AgregarPuerto") {
      const dialogRef = this.dialog.open(DialogAddPGComponent, {
        width: "250px",
        data: { data: this.dataSelect, title: "Puerto" }
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result.event === "Add") {
          this.addPuerto(result.data);
        }
      });
    } else if (value === "AgregarGiro") {
      const dialogRef = this.dialog.open(DialogAddPGComponent, {
        width: "250px",
        data: { data: this.dataSelect, title: "Giro" }
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result.event === "Add") {
          this.addGiro(result.data);
        }
      });
    } else if (value === "AgregarTrafico") {
      const dialogRef = this.dialog.open(DialogComponent, {
        width: "250px",
        data: { data: this.dataSimple, title: "Trafico" }
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result.event === "Add") {
          this.addTrafico(result.data);
        }
      });
    } else {
      this.buqueSelect = this.buques.find(
        b => b.orden == this.entradaInEdition.buque
      );
    }
    return false;
  }
  addPuerto(row_obj) {
    let orden_count = this.puertos[this.puertos.length - 1].orden + 1;

    this.serviceAdicional.createPuerto(
      {
        orden: orden_count,
        puerto: row_obj.name.toUpperCase(),
        pais: row_obj.name2.toUpperCase()
      },
      () => {}
    );
  }
  addGiro(row_obj) {
    let orden_count = this.giros[this.giros.length - 1].orden + 1;
    this.serviceAdicional.createGiro(
      {
        orden: orden_count,
        muelle: row_obj.name.toUpperCase(),
        sector: row_obj.name2.toUpperCase()
      },
      () => {}
    );
  }

  addTrafico(row_obj) {
    let orden_count = this.traficos[this.traficos.length - 1].id + 1;
    this.serviceAdicional.createTrafico(
      { id: orden_count, trafico: row_obj.name.toUpperCase() },
      () => {}
    );
  }
  navigateToEdits(id) {
    window.open(`cgpds/EditarBuque/${id}`, "_blank");
  }

  setupFormEditEntrada() {
    this.isNew = false;
    this.serviceEntrada.getEntrada(this.entradaKey, data => {
      this.entradaInEdition = new Entrada({
        id: data.id,
        giro: data.giro,
        buque: data.buque,
        agencia: data.agencia,
        procedencia: data.procedencia,
        destino:data.destino,
        entrada: new Date(data.entrada),
        salida: new Date(data.salida),
        trafico: data.trafico,
        muelle: data.muelle,
        documento: data.documento,
        nroPasavante: data.nroPasavante,
        cal_ent: data.cal_ent,
        cal_sal: data.cal_sal
      });

    });
  }


  setupFormNewEntrada() {
    this.isNew = true;
    this.entradaInEdition = new Entrada({
      id: "",
      giro: "",
      buque: "",
      agencia: "",
      procedencia: "",
      destino: "",
      entrada: new Date(),
      salida: new Date(),
      trafico: "",
      muelle: "",
      documento: "",
      nro: "",
      cal_ent: "",
      cal_sal: ""
    });

  }

  saveEntrada(entrada) {
    entrada.entrada=this.datepipe.transform( this.entradaInEdition.entrada, 'yyyy/MM/dd hh:mm:ss')
    entrada.salida=this.datepipe.transform( this.entradaInEdition.salida, 'yyyy/MM/dd hh:mm:ss')
    const jsonEntrada = entrada;
    const keyout = "key";
    delete jsonEntrada[keyout];
    if (this.isNew) {
      this.serviceEntrada.createEntrada(jsonEntrada, () => {

        this.ultimaCargada = jsonEntrada;
        if (!this.checked) {
          this.setupFormNewEntrada()
          this.scrollToTop()
        }else {
          this.backToOperaciones()
        }
      })
    } else {
      this.serviceEntrada.updateEntrada(this.entradaKey, jsonEntrada)
    }
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  test(nro) {
    return nro == "";
  }
  backToOperaciones(): void {
    this.route.navigate(['/cgpds/operaciones'])
  }

}
