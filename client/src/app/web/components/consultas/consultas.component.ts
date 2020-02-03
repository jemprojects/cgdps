import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatSort, MatTable } from '@angular/material';

import { DialogBoxComponent } from '../dialog-box/dialog-box.component';

export interface EmpData {
  id:number
  empresa: string;
  rubro: string;
}

const ELEMENT_DATA: EmpData[] = [
];
@Component({
  selector: 'app-consultas',
  templateUrl: './consultas.component.html',
  styleUrls: ['./consultas.component.css']
})
export class ConsultasComponent implements OnInit {
  title: string="EMPRESAS DE SERVICIOS PORTUARIOS QUE OOPERAN EN EL BUQUE"
  constructor(public dialog: MatDialog) {}
  displayedColumns: string[] = ['rubro', 'empresa', 'action'];
  dataSource = ELEMENT_DATA;

  @ViewChild(MatTable,{static:true}) table: MatTable<any>;


  ngOnInit() {

  }
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
      return value.rubro != row_obj.rubro;
    });
  }

}
