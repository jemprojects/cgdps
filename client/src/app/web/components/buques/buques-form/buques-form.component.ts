import { Component, OnInit } from "@angular/core";

import { Buques } from "src/app/web/models/buques";
import { BuquesService } from "src/app/web/services/buques.service";
import { MatDialog } from "@angular/material";

@Component({
  selector: "app-buques-form",
  templateUrl: "./buques-form.component.html",
  styleUrls: ["./buques-form.component.css"]
})
export class BuquesFormComponent implements OnInit {
  service: BuquesService;
  buques: Array<Buques>;

  constructor(public dialog: MatDialog, serviceBuques: BuquesService) {
    this.service = serviceBuques;
  }
  ngOnInit() {
    var scope = this;
    // tslint:disable-next-line: only-arrow-functions
    this.service.getBuques(function(buques) {
      scope.buques = buques;
    });
  }
}
