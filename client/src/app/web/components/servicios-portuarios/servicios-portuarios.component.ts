import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatTable } from '@angular/material';

import { DialogBoxComponent } from '../popUp/dialog-box/dialog-box.component';
import { Esp } from '../../models/simpleData';

const ELEMENT_DATA: Esp[] = [
];
@Component({
  selector: 'app-servicios-portuarios',
  templateUrl: './servicios-portuarios.component.html',
  styleUrls: ['./servicios-portuarios.component.css']
})
export class ServiciosPortuariosComponent {
  title: string="EMPRESAS DE SERVICIOS PORTUARIOS QUE OPERAN EN EL BUQUE"
  constructor(public dialog: MatDialog) {}
  displayedColumns: string[] = ['rubro', 'empresa', 'action'];
  dataSource = ELEMENT_DATA;
  esp: Esp
  @Input() giro_id: number;

  @ViewChild(MatTable,{static:true}) table: MatTable<any>;

  openDialog(action,obj) {
    obj.action = action;
    const dialogRef = this.dialog.open(DialogBoxComponent, {
      width: '250px',
      data:obj
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result.event == 'Add'){
        this.addRowData(result.data);
      }else if(result.event == 'Update'){
        this.updateRowData(result.data);
      }else if(result.event == 'Delete'){
        this.deleteRowData(result.data);
      }
    });
  }

  addRowData(row_obj){
    this.dataSource.push({
      nroGiro:this.giro_id,
      rubro:row_obj.rubro,
      empresa:row_obj.empresa,
    });

    this.table.renderRows();
    console.log(this.dataSource)
  }

  updateRowData(row_obj){
    this.dataSource = this.dataSource.filter((value,key)=>{
      if(value.nroGiro == row_obj.nroGiro){
        value.rubro=row_obj.rubro
        value.empresa = row_obj.empresa;
      }
      return true;
    });
  }

  deleteRowData(row_obj){
    this.dataSource = this.dataSource.filter((value,key)=>{
      return row_obj.nroGiro!= value.nroGiro;
    });
  }
  getData(){
    return this.dataSource
  }
}
