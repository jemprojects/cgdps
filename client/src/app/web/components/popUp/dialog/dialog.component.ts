
//dialog-box.component.ts
import { Component, Inject, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

export interface Data {
  name: string;
  id: number;
}
@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent {
  local_data:any;

  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
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
