import { Component, HostListener, Input, Output } from "@angular/core";

import { ConsultasComponent } from '../../consultas/consultas.component';
import { Entrada } from 'src/app/web/models/entradas';
import { FormEntradaComponent } from "../../Formularios/form-entrada/form-entrada.component";
import { ServiciosPortuariosComponent } from "../../servicios-portuarios/servicios-portuarios.component";
import { TableOperationsComponent } from "../../table-operations/table-operations.component";

@Component({
  selector: "app-entrada",
  templateUrl: "./entrada.component.html",
  styleUrls: ["./entrada.component.css"]
})
export class EntradaComponent {
  @Input() formEnt: FormEntradaComponent;
  @Input() servPort: ServiciosPortuariosComponent;
  @Input() operaciones: TableOperationsComponent;
  @Input() consultas: ConsultasComponent;
  @Output()consultas1: ConsultasComponent;



}
