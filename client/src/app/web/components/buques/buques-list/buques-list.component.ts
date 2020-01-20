import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';

import { Arboladura } from 'src/app/web/models/arboladura';
import { ArboladurasService } from 'src/app/web/services/arboladura.service';
import { Bandera } from 'src/app/web/models/bandera';
import { BanderasService } from 'src/app/web/services/bandera.service';
import { Buques } from 'src/app/web/models/buques';
import { BuquesService } from 'src/app/web/services/buques.service';
import { FormControl } from '@angular/forms';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-buques-list',
  templateUrl: './buques-list.component.html',
  styleUrls: ['./buques-list.component.css']
})
export class BuquesListComponent implements OnInit, AfterViewInit {

  service: BuquesService;
  buques: Array<Buques>;
  search = new FormControl('');
  serviceBandera: BanderasService
  banderas: Array<Bandera>
  arboladuras: Array<Arboladura>
  serviceArboladura: ArboladurasService
  displayedColumns: string[] = ['orden', 'nombre', 'bandera', 'arboladura', 'eslora','manga','puntal','imo', 'trn', 'trb'];
  columnsToDisplay: string[] = this.displayedColumns.slice();
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  dataSource: MatTableDataSource<Buques>

  constructor(public dialog: MatDialog, serviceBuques: BuquesService, serviceBanderas:BanderasService, serviceArboladura: ArboladurasService) {
    this.service = serviceBuques;
    this.serviceArboladura=serviceArboladura
    this.serviceBandera= serviceBanderas
    this.buques=null

  }

  ngOnInit() {
    let scope = this;
    this.service.getBuques(function(buques) {
      scope.buques = buques;

    });
    this.serviceArboladura.getarboladuras(function(arboladuras) {
      scope.arboladuras = arboladuras;

    });
    this.serviceBandera.getBanderas(function(banderas) {
      scope.banderas = banderas;

    });

    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

  }
  ngAfterViewInit(): void {
    let scope = this;
    this.service.getBuques(function(buques) {
      scope.buques = buques;

    });
  }
  ngAfterViewChecked(){
    this.dataSource = new MatTableDataSource(this.buques);

  }
  getBandera(orden: number) {
    const result = this.banderas.filter(element => {
      console.log(orden)
      return element.orden === orden;
    });

    return result
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }

  }

}

