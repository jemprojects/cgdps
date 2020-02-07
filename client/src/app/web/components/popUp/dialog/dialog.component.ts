//dialog-box.component.ts
import { Component, Inject, Optional, ViewChild, ElementRef } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
export interface Data {
  id: number;
  name: string;
  title:string
}
@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent {
  local_data:any;
  titleA: string

  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any) {
      if(data){
        this.titleA = data.title || this.titleA;
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
