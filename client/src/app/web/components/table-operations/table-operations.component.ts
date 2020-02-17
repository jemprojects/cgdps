import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatTable } from '@angular/material';
import { Mercaderia, Operacion, Tipo } from '../../models/operacion';

import { DialogOperationsComponent } from '../popUp/dialog-operations/dialog-operations.component';
import { OperacionsService } from '../../services/operacion.service';

const ELEMENT_DATA: Operacion[] = [
];
@Component({
  selector: 'app-table-operations',
  templateUrl: './table-operations.component.html',
  styleUrls: ['./table-operations.component.css']
})
export class TableOperationsComponent implements OnInit {
  service: OperacionsService;

  title='EMPRESAS DE SERVICIOS PORTUARIOS QUE OPERAN EN EL BUQUE'
  constructor(service: OperacionsService, public dialog: MatDialog) {
    this.service = service;
  }
  displayedColumns: string[] = ['mercaderia', 'tns', 'tipo', 'action'];
  dataSource = ELEMENT_DATA;
  count = 0;
  operacion: Operacion;
  mercaderia: Mercaderia;
  tipo: Tipo;
  mercaderias: Array<Mercaderia>;
  tipos: Array<Tipo>;
  @Input() giro_id: number;

  @ViewChild(MatTable, {static: true}) table: MatTable<any>;
  ngOnInit(): void {
    const scope = this;
    this.service.getTipos(function(tipos) {
      scope.tipos = tipos;
    });
    this.service.getMercaderias(function(mercaderias) {
      scope.mercaderias = mercaderias;
    });
  }
  openDialog(action, obj) {
    obj.action = action;
    const dialogRef = this.dialog.open(DialogOperationsComponent, {
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
 /* create(row_obj): Esp {
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

  }*/

  addRowData(row_obj) {
    this.dataSource.push({
      id: row_obj.id,
      mercaderia: row_obj.mercaderia.tipo,
      tns: row_obj.tns,
      tipo:row_obj.tipo.tipo,
      giro_id: this.giro_id
      });
    this.table.renderRows();
    console.log(this.dataSource);
  }

  updateRowData(row_obj) {
    //let op= this.create(row_obj)
    this.dataSource = this.dataSource.filter((value, key) => {
      if (value.id === row_obj.id) {
        value.mercaderia = row_obj.mercaderia.tipo;
        value.tns = row_obj.tns;
        value.tipo = row_obj.tipo.tipo
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
    this.dataSource.forEach(a=>this.service.createOperacion(a, ()=>{}))
  }
  getTotalCost() {
    return this.dataSource.map(t => t.tns).reduce((acc, value) => acc + value, 0);
  }
}
