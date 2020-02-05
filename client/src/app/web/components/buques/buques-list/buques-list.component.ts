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

const ELEMENT_DATA: Buques[] = listaDeBuques;
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
  dataSource = ELEMENT_DATA;
    // tslint:disable-next-line: no-input-rename
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  displayedColumns: string[] = ['orden', 'nombre', 'bandera', 'arboladura', 'eslora', 'manga', 'puntal', 'imo', 'trn', 'trb'];
  columnsToDisplay: string[] = this.displayedColumns.slice();

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  constructor(public dialog: MatDialog, serviceBuques: BuquesService ) {
    this.service = serviceBuques;
  }

  ngOnInit() {
    const scope = this;
    this.service.getBuques(function(buques) {
      scope.buques = buques

    });

  }
  getBanderaName(element){
    return ((this.banderas.find(b=> b.orden===element)).bandera)
  }
  getArboladuraName(element){
    return ((this.arboladuras.find(b=> b.codigo==element)).arboladura)
  }
}

