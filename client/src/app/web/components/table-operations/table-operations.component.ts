import {
  AfterViewInit,
  Component,
  HostBinding,
  HostListener,
  Input,
  OnInit,
  ViewChild
} from "@angular/core";
import { MatDialog, MatTable, MatTableDataSource } from "@angular/material";
import { Mercaderia, Operacion, Tipo } from "../../models/operacion";

import { DialogComponent } from "../popUp/dialog/dialog.component";
import { OperacionsService } from "../../services/operacion.service";
import listaDeOperaciones from "src/assets/json/operacion.json";

const ELEMENT_DATA: Operacion[] = [];
@Component({
  selector: "app-table-operations",
  templateUrl: "./table-operations.component.html",
  styleUrls: ["./table-operations.component.css"]
})
export class TableOperationsComponent implements OnInit {
  service: OperacionsService;
  @Input() giro_id: number;
  operaciones: Array<Operacion> = listaDeOperaciones;
  ELEMENT_DATA = [];
  dataSource = ELEMENT_DATA;
  title = "EMPRESAS DE SERVICIOS PORTUARIOS QUE OPERAN EN EL BUQUE";
  dataSimple: { id: number; name: string };
  count = 0;
  operacion = new Operacion({
    id: "",
    mercaderia: "",
    tns: 0,
    tipo: "",
    giro_id: this.giro_id
  });
  mercaderia: Mercaderia;
  tipo: Tipo;
  mercaderias: Array<Mercaderia>;
  tipos: Array<Tipo>;
  displayedColumns: string[] = ["mercaderia", "tns", "tipo", "action"];

  constructor(service: OperacionsService, public dialog: MatDialog) {
    this.service = service;
  }

  @ViewChild(MatTable, { static: true }) table: MatTable<any>;
  @HostBinding("class.is-open")
  isOpen = false;

  toggle() {
    this.isOpen = !this.isOpen;
  }
  ngOnInit(): void {
    const scope = this;
    this.service.getTipos(function(tipos) {
      scope.tipos = tipos;
    });
    this.service.getMercaderias(function(mercaderias) {
      scope.mercaderias = mercaderias;
    });
    this.service.getOperacions(function(operaciones) {
      scope.operaciones = operaciones;
    });
    this.initTable();
  }
  initTable() {
    this.dataSource.push(this.createNewOperation(1));
    this.dataSource.push(this.createNewOperation(2));
  }

  getTotal(n1, n2) {
    // tslint:disable-next-line: radix
    return parseInt(n1) + parseInt(n2);
  }
  createNewOperation(id: number): Operacion {
    return { id, mercaderia: "", tns: 0, tipo: "", giro_id: this.giro_id };
  }
  addRow() {
    this.dataSource.push(this.createNewOperation(this.dataSource.length + 1));
    this.table.renderRows();
  }

  deleteRow(id: number) {
    this.dataSource = this.dataSource.filter((value, key) => {
      return id != value.id;
    });
  }
  getTotalCost() {
    let suma = 0;
    for (let i = 0; i < this.dataSource.length; i++) {
      suma = suma + this.dataSource[i].tns;
    }
    return suma;
  }
  navigateTo(value) {
    if (value === "AgregarTipo") {
      const dialogRef = this.dialog.open(DialogComponent, {
        width: "250px",
        data: { data: this.dataSimple, title: "Tipo" }
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result.event == "Add") {
          this.addTipo(result.data);
        }
      });
    } else if (value === "AgregarMercaderia") {
      const dialogRef = this.dialog.open(DialogComponent, {
        width: "250px",
        data: { data: this.dataSimple, title: "Mercaderia" }
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result.event == "Add") {
          this.addMercaderia(result.data);
        }
      });
    }
    return false;
  }
  addTipo(row_obj) {
    let orden_count = this.tipos[this.tipos.length - 1].id + 1;
    this.service.createTipo(
      { id: orden_count, tipo: row_obj.name.toUpperCase() },
      () => {}
    );
  }
  addMercaderia(row_obj) {
    let orden_count = this.mercaderias[this.mercaderias.length - 1].orden + 1;
    this.service.createMercaderia(
      { orden: orden_count, tipo: row_obj.name.toUpperCase() },
      () => {}
    );
  }
  test() {
    let vacia = this.dataSource.map(function(d) {
      return d.mercaderia != "" && d.tipo != "";
    });
    return vacia.some(t => t == true);
  }
  saveOperations() {
    this.dataSource[0].giro_id = this.giro_id;
    this.dataSource[1].giro_id = this.giro_id;
    this.dataSource.forEach(a => this.service.createOperacion(a, () => {}));
  }
}
