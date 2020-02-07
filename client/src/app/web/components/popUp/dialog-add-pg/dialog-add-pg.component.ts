import { Component, OnInit } from '@angular/core';
import { Inject, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

export interface Data {
  name: string;
  name2:string
  id: number;
}

@Component({
  selector: 'app-dialog-add-pg',
  templateUrl: './dialog-add-pg.component.html',
  styleUrls: ['./dialog-add-pg.component.css']
})
export class DialogAddPGComponent{
 local_data:any;
 title: string
  constructor(
    public dialogRef: MatDialogRef<DialogAddPGComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any) {
      if(data){
        this.title = data.title || this.title;
        this.local_data= data || this.local_data}
  }

  doAction(){
    this.dialogRef.close({event:'Add',data:this.local_data});
  }

  onNoClick(): void {
    this.data=null
    this.dialogRef.close({event:'Cancel'});
  }

}
