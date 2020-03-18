// dialog-box.component.ts
import { Component, Inject, Optional, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import listaRubros from "src/assets/json/rubro_esp.json";
import listaEmpresas from "src/assets/json/emp_serv_port.json";
import { FormControl } from "@angular/forms";
import { Observable } from "rxjs";
import { startWith, map } from "rxjs/operators";
import { User } from "firebase";

import { EspService } from "src/app/web/services/esp.service";
export interface Data {
  rubro: Rubro;
  empresa: EmpresaServPort;
  id: 0;
}
export interface Rubro {
  id: number;
  rubro_esp: string;
}
export interface EmpresaServPort {
  id: number;
  esp: string;
}

@Component({
  selector: "app-dialog-box",
  templateUrl: "./dialog-box.component.html",
  styleUrls: ["./dialog-box.component.css"]
})
export class DialogBoxComponent implements OnInit {
  myControl = new FormControl();
  rubros: any = listaRubros;
  myControlE = new FormControl();
  empServPort: any = listaEmpresas;

  action: string;
  local_data: any;
  accion: string;
  service: EspService;
  constructor(
    service: EspService,
    public dialogRef: MatDialogRef<DialogBoxComponent>,
    // @Optional() is used to prevent error if no data is passed
    @Optional() @Inject(MAT_DIALOG_DATA) public data: Data
  ) {
    console.log(data);
    this.local_data = { ...data };
    this.action = this.local_data.action;
    this.service = service;
  }
  changeText() {
    if (this.action == "Add") {
      this.accion = "Añadir";
    } else if (this.action == "Update") {
      this.accion = "Actualizar";
    } else if (this.action == "Delete") {
      this.accion = "Eliminar";
    }
    return this.accion;
  }
  doAction() {
    this.dialogRef.close({ event: this.action, data: this.local_data });
  }

  closeDialog() {
    this.dialogRef.close({ event: "Cancelar" });
  }
  ngOnInit() {
    const scope = this;
    this.service.getRubros(function(rubros) {
      scope.rubros = rubros;
    });
    this.service.getEmpServPort(function(emp_serv_port) {
      scope.empServPort = emp_serv_port;
    });

  }

}
