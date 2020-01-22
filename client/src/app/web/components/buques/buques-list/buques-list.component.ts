import { AfterViewChecked, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatSort } from '@angular/material';

import { Arboladura } from 'src/app/web/models/arboladura';
import { ArboladurasService } from 'src/app/web/services/arboladura.service';
import { Bandera } from 'src/app/web/models/bandera';
import { BanderasService } from 'src/app/web/services/bandera.service';
import { Buques } from 'src/app/web/models/buques';
import { BuquesService } from 'src/app/web/services/buques.service';
import { FormControl } from '@angular/forms';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-buques-list',
  templateUrl: './buques-list.component.html',
  styleUrls: ['./buques-list.component.css']
})
export class BuquesListComponent implements OnInit, AfterViewChecked {
  service: BuquesService;
  buques: Array<Buques>;
  search = new FormControl('');
  serviceBandera: BanderasService;
  banderas: Array<Bandera>;
  arboladuras: Array<Arboladura>;
  serviceArboladura: ArboladurasService;
    // tslint:disable-next-line: no-input-rename
  dataSource = new  MatTableDataSource<Buques>(this.buques);
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  displayedColumns: string[] = ['orden', 'nombre', 'bandera', 'arboladura', 'eslora', 'manga', 'puntal', 'imo', 'trn', 'trb'];
  columnsToDisplay: string[] = this.displayedColumns.slice();

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  constructor(public dialog: MatDialog, serviceBuques: BuquesService,
              serviceBanderas: BanderasService, serviceArboladura: ArboladurasService) {
    this.service = serviceBuques;
    this.serviceArboladura = serviceArboladura;
    this.serviceBandera = serviceBanderas;
    this.buques=null
  }

  ngOnInit() {
    const scope = this;
    this.service.getBuques(function(buques) {
      scope.buques = buques

    });
    this.serviceArboladura.getarboladuras(function(arboladuras) {
      scope.arboladuras = arboladuras;

    });
    this.serviceBandera.getBanderas(function(banderas) {
      scope.banderas = banderas;

    });

    this.dataSource.paginator = this.paginator;
  }

  ngAfterViewChecked() {
    this.dataSource = new  MatTableDataSource<Buques>(this.buques);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  getNameBandera(elem) {

    return this.banderas.find((element)=> element.orden == elem).bandera

  }
  getNameArboladura(elem) {
    return this.arboladuras.find((element)=> element.codigo == elem).arboladura
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}

