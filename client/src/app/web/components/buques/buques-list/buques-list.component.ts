import { Arboladura, Bandera } from 'src/app/web/models/simpleData';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatTableDataSource } from '@angular/material';

import { AditionalService } from 'src/app/web/services/adicional.service';
import { Buques } from 'src/app/web/models/buques';
import { BuquesService } from 'src/app/web/services/buques.service';
import { Entrada } from 'src/app/web/models/entradas';
import listaDeArboladura from 'src/assets/json/arboladura.json';
import listaDeBanderas from 'src/assets/json/bandera.json';
import listaDeBuques from 'src/assets/json/buques.json';

const ELEMENT_DATA: Buques[] = listaDeBuques;
@Component({
  selector: 'app-buques-list',
  templateUrl: './buques-list.component.html',
  styleUrls: ['./buques-list.component.css']
})
export class BuquesListComponent implements OnInit{

  service: BuquesService;
  buqueInEdition: Buques;
  buqueOrd: number
  bandera: string
  arboladura:string
  buques: Array<Buques>=listaDeBuques;
  serviceAdd: AditionalService;
  arboladuras: Array<Arboladura>=listaDeArboladura;
  banderas: Array<Bandera>=listaDeBanderas;
  dataSelect: {a: number, b: string};
  displayedColumnsBuque: string[] = ['ORDEN','BANDERA', 'ARBOLADURA', 'IMO','ESLORA', 'MANGA', 'TRN', 'TRB']
  displayedColumns: string[] = ['GIRO', 'AGENCIA', 'PROCENDENCIA', 'DESSTINO','ENTRADA','SALIDA','MUELLE', 'TRAFICO', 'DOCUMENTO', 'NRO'];
  dataSource =new MatTableDataSource<Entrada>();
  columnsToDisplay: string[] = this.displayedColumns.slice();
  resultsLength:number;
  constructor(public dialog: MatDialog,
              serviceBuques: BuquesService,
              serviceAditional: AditionalService ) {
    this.service = serviceBuques;
    this.serviceAdd = serviceAditional;
    this.buqueInEdition = null;
    this.banderas = [];
    this.arboladuras = [];
  }

  ngOnInit() {
    const scope = this;
    this.service.getBuques(function(buques) {
      scope.buques = buques;
    });
    this.serviceAdd.getBanderas(function(banderas) {
      scope.banderas = banderas;
    });
    this.serviceAdd.getArboladuras(function(arboladuras) {
      scope.arboladuras = arboladuras;
    });

  }
  cargarDatosBuque(){
    this.buqueInEdition=this.buques.find(b=>b.orden== this.buqueOrd)
    this.bandera=(this.banderas.find(b => b.orden === this.buqueInEdition.bandera)).bandera
    this.arboladura=(this.arboladuras.find(b => b.codigo == this.buqueInEdition.arboladura)).arboladura;
    console.log(this.buqueInEdition)

  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


}

