import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatTable } from '@angular/material';

import { DialogBoxComponent } from '../popUp/dialog-box/dialog-box.component';

export interface EmpData {
  id:number
  empresa: string;
  rubro: string;
}

const ELEMENT_DATA: EmpData[] = [
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

  @ViewChild(MatTable,{static:true}) table: MatTable<any>;

  id_count: number=0
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
      id:this.id_count++,
      rubro:row_obj.rubro,
      empresa:row_obj.empresa,
    });
    this.table.renderRows();
  }
  updateRowData(row_obj){
    this.dataSource = this.dataSource.filter((value,key)=>{
      if(value.id == row_obj.id){
        value.rubro=row_obj.rubro
        value.empresa = row_obj.empresa;
      }
      return true;
    });
  }
  deleteRowData(row_obj){
    this.dataSource = this.dataSource.filter((value,key)=>{
      return row_obj.id!= value.id;
    });
  }
  getData(){
    return this.dataSource
  }
}
