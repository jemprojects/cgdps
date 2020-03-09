import {
  Bandera,
  Empresa,
  Envase,
  Movimiento
} from "src/app/web/models/simpleData";
import { Component, HostBinding, OnInit } from "@angular/core";

import { AditionalService } from "src/app/web/services/adicional.service";
import { DialogAddPGComponent } from "../../popUp/dialog-add-pg/dialog-add-pg.component";
import { DialogComponent } from "../../popUp/dialog/dialog.component";
import { MatDialog } from "@angular/material";
import { Mercaderia } from "src/app/web/models/operacion";
import { OperacionsService } from "src/app/web/services/operacion.service";
import { Puerto } from "src/app/web/models/puertos";
import listaDePuertos from "src/assets/json/puertos.json";

@Component({
  selector: "app-form-carga",
  templateUrl: "./form-carga.component.html",
  styleUrls: ["./form-carga.component.css"]
})
export class FormCargaComponent implements OnInit {
  selected: string;

  dataSimple: { id: number; name: string };
  dataSelect: { id: number; name: string; name2: string };
  empresas: Array<Empresa>;
  envases: Array<Envase>;
  productos: Array<Mercaderia>;
  puertos: Array<Puerto> = listaDePuertos;
  banderas: Array<Bandera>;
  movimiento: Movimiento;
  selectedPort: string;
  nroGiroE: number;

  @HostBinding("class.is-open")
  isOpen = false;

  toggle() {
    this.isOpen = !this.isOpen;
  }
  constructor(
    public dialog: MatDialog,
    private service: AditionalService,
    private serviceO: OperacionsService
  ) {
    this.movimiento = null;
  }

  ngOnInit() {
    const scope = this;
    this.service.getEmpresas(function(empresas) {
      scope.empresas = empresas;
    });
    this.service.getEnvases(function(envases) {
      scope.envases = envases;
    });
    this.serviceO.getMercaderias(function(productos) {
      scope.productos = productos;
    });
    this.service.getPuertos(function(puertos) {
      scope.puertos = puertos;
    });
    this.service.getBanderas(function(banderas) {
      scope.banderas = banderas;
    });
    this.setupFormNewMov();
  }
  load() {
    return (this.movimiento.nroGiro = this.nroGiroE);
  }
  setupFormNewMov() {
    this.movimiento = new Movimiento({
      nroGiro: this.nroGiroE,
      tipo: "",
      operacion: "",
      empresa: "",
      envase: "",
      cantidad: "",
      puertoOrigen: "",
      paisOrigen: "",
      producto: ""
    });
  }

  navigateTo(value) {
    if (value === "AgregarProducto") {
      const dialogRef = this.dialog.open(DialogComponent, {
        width: "250px",
        data: { data: this.dataSimple, title: "Producto" }
      });

      dialogRef.afterClosed().subscribe(result => {
        // tslint:disable-next-line: triple-equals
        if (result.event === "Add") {
          this.addMercaderia(result.data);
        }
      });
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
    } else {
      this.movimiento.puertoOrigen = this.puertos.find(
        b => b.puerto === this.selectedPort
      );
    }
    return false;
  }
  addPuerto(row_obj) {
    let orden_count = this.puertos[this.puertos.length - 1].orden + 1;

    this.service.createPuerto(
      {
        orden: orden_count,
        puerto: row_obj.name.toUpperCase(),
        pais: row_obj.name2.toUpperCase()
      },
      () => {}
    );
  }
  addMercaderia(row_obj) {
    let orden_count = this.productos[this.productos.length - 1].orden + 1;
    this.serviceO.createMercaderia(
      { orden: orden_count, tipo: row_obj.name.toUpperCase() },
      () => {}
    );
  }
}
