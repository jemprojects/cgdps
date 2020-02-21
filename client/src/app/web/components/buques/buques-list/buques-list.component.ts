import { Arboladura, Bandera } from 'src/app/web/models/simpleData';
import { Component, OnInit, ViewChild } from '@angular/core';
import { DataTable, EntradasListComponent } from '../../entradas/entradas-list/entradas-list.component';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';

import { AditionalService } from 'src/app/web/services/adicional.service';
import { Buques } from 'src/app/web/models/buques';
import { BuquesService } from 'src/app/web/services/buques.service';
import { Entrada } from 'src/app/web/models/entradas';
import {
EntradasService
} from 'src/app/web/services/entradas.service';
import listaDeArboladura from 'src/assets/json/arboladura.json';
import listaDeBanderas from 'src/assets/json/bandera.json';
import listaDeBuques from 'src/assets/json/buques.json';
import listaDeEntradas from 'src/assets/json/entradas.json';

const ELEMENT_DATA: Buques[] = listaDeBuques;
@Component({
  selector: 'app-buques-list',
  templateUrl: './buques-list.component.html',
  styleUrls: ['./buques-list.component.css']
})
export class BuquesListComponent implements OnInit{
  serviceEntrada: EntradasService
  entradas: Array<Entrada>=listaDeEntradas;

  service: BuquesService;
  buqueSelect: Buques;
  bandera: Bandera
  arboladura:Arboladura
  buques: Array<Buques>=listaDeBuques;
  serviceAdd: AditionalService;
  arboladuras: Array<Arboladura>=listaDeArboladura;
  banderas: Array<Bandera>=listaDeBanderas;
  displayedColumnsBuque: string[] = ['ORDEN','BANDERA', 'ARBOLADURA', 'IMO','ESLORA', 'MANGA', 'TRN', 'TRB']
  displayedColumns: string[] = ['GIRO', 'AGENCIA', 'PROCENDENCIA', 'DESTINO','ENTRADA','SALIDA','MUELLE', 'TRAFICO', 'DOCUMENTO', 'NRO'];
  dataSource: MatTableDataSource<DataTable>;
  columnsToDisplay: string[] = this.displayedColumns.slice();
  resultsLength:number;
  entradasFiltradas: DataTable[]

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(serviceBuques: BuquesService,
              serviceAditional: AditionalService,
              serviceEntrada: EntradasService) {
    this.service = serviceBuques;
    this.serviceAdd = serviceAditional;
    this.serviceEntrada= serviceEntrada
    this.entradas=listaDeEntradas
    this.entradasFiltradas = null

  }

  ngOnInit() {
    const scope = this;
    this.serviceAdd.getArboladuras(function(arboladuras) {
      scope.arboladuras = arboladuras;
    });
    this.service.getBuques(function(buques) {
      scope.buques = buques;
    });
    this.serviceAdd.getBanderas(function(banderas) {
      scope.banderas = banderas;
    });

    this.setupFormNewBuque();
  }
  completeTable(){
    let table: DataTable[]=[]

    Object.entries(this.entradas).filter(([_, value]) => value.buque=== this.buqueSelect.orden);
    console.log(Object.entries(this.entradas).filter(([_, value])=> value.buque== this.buqueSelect.orden))
    return table
  }

  setupFormNewBuque() {
    this.buqueSelect = new Buques({
      key:'',
      orden: '',
      nombre: '',
      cuit: '',
      bandera: '',
      arboladura: '',
      eslora: '',
      manga: '',
      puntal: '',
      trn: '',
      trb: '',
      imo: ''
    });
  }
  vacio(){
    return !(this.buqueSelect.nombre==='')
  }
  navigateToEdits(id) {
    window.open(`cgpds/EditarBuque/${id}`, '_blank');
  }
  cargarDatosBuque(){
  //  this.buqueSelect=this.buques.find(b=>b.orden== this.buqueOrd);
    this.bandera=(this.banderas.find(b => b.orden === this.buqueSelect.bandera))
   // console.log(this.arboladuras)
    this.arboladura= (this.arboladuras.find(b => b.codigo === this.buqueSelect.arboladura))
   // console.log(this.arboladura)
   // console.log(this.bandera)
   this.dataSource = new MatTableDataSource(this.completeTable());
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  getEntradasOfBuque(){
    //this.dataSource=
  }

}

