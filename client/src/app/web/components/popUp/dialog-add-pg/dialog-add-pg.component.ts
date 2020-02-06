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

  constructor(
    public dialogRef: MatDialogRef<DialogAddPGComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: Data) {
    this.local_data = {...data};
  }

  doAction(){
    this.dialogRef.close({event:'Add',data:this.local_data});
  }

  onNoClick(): void {
    this.data=null
    this.dialogRef.close({event:'Cancel'});
  }

}
