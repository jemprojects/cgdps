import { Component, Inject, OnInit } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";

@Component({
  selector: "app-buque-detail",
  templateUrl: "./buque-detail.component.html",
  styleUrls: ["./buque-detail.component.css"]
})
export class BuqueDetailComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<BuqueDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data
  ) {}

  ngOnInit() {}

  closeData() {
    this.dialogRef.close("Close");
  }
}
