import { Component, OnInit } from '@angular/core';

import { Buques } from 'src/app/web/models/buques';
import { BuquesService } from 'src/app/web/services/buques.service';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-buques-list',
  templateUrl: './buques-list.component.html',
  styleUrls: ['./buques-list.component.css']
})
export class BuquesListComponent implements OnInit {
  service: BuquesService;
  buques: Array<Buques>;
  buquesFiltrados: Buques[];
  search = new FormControl('');

  constructor(public dialog: MatDialog, serviceBuques: BuquesService) {
    this.service = serviceBuques;
    this.buquesFiltrados = null;
  }

  ngOnInit() {
    let scope = this;
    this.service.getBuques(function(buques) {
      scope.buques = buques;
      scope.applyFilter(scope.search.value);
    });
    this.search.valueChanges.subscribe((filterValue: string) =>
      this.applyFilter(filterValue)
    );
  }
  applyFilter(filterValue: string) {
    if (filterValue.length === 0) {
      this.buquesFiltrados = this.buques;
    } else {
      this.buquesFiltrados = this.buques.filter(buque =>
        this.filterBuques(buque, filterValue)
      );
    }
  }

  private filterBuques(buque: Buques, filterValue: string) {
    filterValue = filterValue.toLowerCase().trim();
    const porNombre = buque.nombre.toLowerCase();
    const porOrden = buque.orden;
    return porNombre.indexOf(filterValue) >= 0 || porOrden >= 0;
  }
}
