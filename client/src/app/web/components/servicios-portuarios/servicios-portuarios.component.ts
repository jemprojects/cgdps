import { Component, Input, OnInit, ViewChild } from '@angular/core';
import {EmpresaServPorts, Esp, Rubro} from '../../models/simpleData';
import { MatDialog, MatTable } from '@angular/material';

import { DialogBoxComponent } from '../popUp/dialog-box/dialog-box.component';
import { EspService } from '../../services/esp.service';

const ELEMENT_DATA: Esp[] = [
];
@Component({
  selector: 'app-servicios-portuarios',
  templateUrl: './servicios-portuarios.component.html',
  styleUrls: ['./servicios-portuarios.component.css']
})
export class ServiciosPortuariosComponent implements OnInit {
  service: EspService;

  title='EMPRESAS DE SERVICIOS PORTUARIOS QUE OPERAN EN EL BUQUE'
  constructor(service: EspService, public dialog: MatDialog) {
    this.service = service;
  }
  displayedColumns: string[] = ['rubro', 'empresa', 'action'];
  dataSource = ELEMENT_DATA;
  count = 0;
  esp: Esp;
  rubro: Rubro;
  empresa: EmpresaServPorts;
  rubros: Array<Rubro>;
  empresas: Array<EmpresaServPorts>;
  @Input() giro_id: number;

  @ViewChild(MatTable, {static: true}) table: MatTable<any>;
  ngOnInit(): void {
    const scope = this;
    this.service.getRubros(function(rubros) {
      scope.rubros = rubros;
    });
    this.service.getEmpServPort(function(emp_serv_port) {
      scope.empresas = emp_serv_port;
    });
  }
  openDialog(action, obj) {
    obj.action = action;
    const dialogRef = this.dialog.open(DialogBoxComponent, {
      width: '250px',
      data: obj
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.event == 'Add') {
        this.addRowData(result.data);
      } else if (result.event == 'Update') {
        this.updateRowData(result.data);
      } else if (result.event == 'Delete') {
        this.deleteRowData(result.data);
      }
    });
  }
  create(row_obj): Esp {
    const isRubro = typeof(row_obj.rubro) === typeof('fgg');
    const isEmpresa = typeof(row_obj.empresa) === typeof('fgg');

    if (isEmpresa && isRubro) {
      console.log('ambos');
      this.rubro = new Rubro({id: this.rubros.length , rubro_esp: row_obj.rubro.toUpperCase()});
      this.empresa = new EmpresaServPorts({id: this.empresas.length , esp: row_obj.empresa.toUpperCase()});
      this.service.createRubro(this.rubro,()=>{})
      this.service.createEmpServPort(this.empresa,()=>{})
    } else if (isRubro || isEmpresa) {
      console.log('or');
      if (isRubro) {
        console.log('only rubro');
        this.rubro = new Rubro({id: this.rubros.length , rubro_esp: row_obj.rubro.toUpperCase()});
        this.empresa = new EmpresaServPorts(row_obj.empresa);
        this.service.createRubro(this.rubro,()=>{})
      }
      if (isEmpresa) {
        console.log('only emp');
        this.rubro = new Rubro(row_obj.rubro);
        this.empresa = new EmpresaServPorts({id: this.empresas.length , esp: row_obj.empresa.toUpperCase()});
        this.service.createEmpServPort(this.empresa,()=>{})
      }
    } else {
      console.log('ninguno');
      this.rubro = new Rubro(row_obj.rubro);
      this.empresa = new EmpresaServPorts(row_obj.empresa);
    }
    this.count++;
    return {
      id: this.count,
      nroGiro: this.giro_id,
      rubro: this.rubro,
      empresa: this.empresa,
    };

  }

  addRowData(row_obj) {
    this.dataSource.push(this.create(row_obj));
    this.table.renderRows();
    console.log(this.dataSource);
  }

  updateRowData(row_obj) {
    let esp= this.create(row_obj)
    this.dataSource = this.dataSource.filter((value, key) => {
      if (value.id === row_obj.id) {
        value.rubro = esp.rubro;
        value.empresa = esp.empresa;
      }
      return true;
    });
  }

  deleteRowData(row_obj) {
    this.dataSource = this.dataSource.filter((value, key) => {
      return row_obj.id != value.id ;
    });
  }

  saveESP(){
    this.dataSource.forEach(a=>this.service.createEsp(a, ()=>{}))
  }
}
