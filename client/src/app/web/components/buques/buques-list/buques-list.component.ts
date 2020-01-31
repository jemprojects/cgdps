import { AfterViewChecked, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatSort } from '@angular/material';

import { Buques } from 'src/app/web/models/buques';
import { BuquesService } from 'src/app/web/services/buques.service';
import { FormControl } from '@angular/forms';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import listaDeArboladura from 'src/assets/json/arboladura.json';
import listaDeBanderas from 'src/assets/json/bandera.json';
import listaDeBuques from 'src/assets/json/buques.json';

@Component({
  selector: 'app-buques-list',
  templateUrl: './buques-list.component.html',
  styleUrls: ['./buques-list.component.css']
})
export class BuquesListComponent implements OnInit {
  service: BuquesService;
  search = new FormControl('');
  buques: any=listaDeBuques;
  banderas: any=listaDeBanderas;
  arboladuras: any=listaDeArboladura;

    // tslint:disable-next-line: no-input-rename
  dataSource = new  MatTableDataSource<Buques>(this.buques);
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  displayedColumns: string[] = ['orden', 'nombre', 'bandera', 'arboladura', 'eslora', 'manga', 'puntal', 'imo', 'trn', 'trb'];
  columnsToDisplay: string[] = this.displayedColumns.slice();

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  constructor(public dialog: MatDialog, serviceBuques: BuquesService ) {
    this.service = serviceBuques;
    this.buques=null
  }

  ngOnInit() {
    const scope = this;
    this.service.getBuques(function(buques) {
      scope.buques = buques

    });
    this.dataSource = new  MatTableDataSource<Buques>(this.buques);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }



  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}

