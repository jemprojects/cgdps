import { Arboladura, Bandera, Trafico } from 'src/app/web/models/simpleData';
import { Component, OnInit, ViewChild } from '@angular/core';
import { DataTable, EntradasListComponent } from '../../entradas/entradas-list/entradas-list.component';
import { MatPaginator, MatSort, MatTable, MatTableDataSource } from '@angular/material';

import { AditionalService } from 'src/app/web/services/adicional.service';
import { Agencias } from 'src/app/web/models/agencias';
import { AgenciasService } from 'src/app/web/services/agencias.service';
import { Buques } from 'src/app/web/models/buques';
import { BuquesService } from 'src/app/web/services/buques.service';
import {
EntradasService
} from 'src/app/web/services/entradas.service';
import { Giros } from 'src/app/web/models/giros';
import { Puerto } from 'src/app/web/models/puertos';
import listaDeAgencias from 'src/assets/json/agencias.json';
import listaDeArboladura from 'src/assets/json/arboladura.json';
import listaDeBanderas from 'src/assets/json/bandera.json';
import listaDeBuques from 'src/assets/json/buques.json';
import listaDeEntradas from 'src/assets/json/entradas.json';
import listaDeGiros from 'src/assets/json/giros.json';
import listaDePuertos from 'src/assets/json/puertos.json';
import listaDeTrafico from 'src/assets/json/trafico.json';
import listaDoc from 'src/assets/json/documento.json';

@Component({
  selector: 'app-buques-list',
  templateUrl: './buques-list.component.html',
  styleUrls: ['./buques-list.component.css']
})
export class BuquesListComponent implements OnInit{
  serviceEntrada: EntradasService
  entradas: Array<DataTable>=listaDeEntradas;

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
  columnsToDisplay: string[] = this.displayedColumns.slice();
  resultsLength:number;
  entradasFiltradas: DataTable[]
  dataSource: MatTableDataSource<DataTable>;
  agencias: Array<Agencias>= listaDeAgencias
  puertos: Array<Puerto> = listaDePuertos;
  giros: Array<Giros> = listaDeGiros;
  traficos: Array<Trafico> = listaDeTrafico;
  documentos: any= listaDoc
  serviceAgencia: AgenciasService;
  serviceAdicional: AditionalService;
  @ViewChild(MatTable, {static: true}) table: MatTable<any>;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
 @ViewChild(EntradasListComponent, {static: true}) entradasList: EntradasListComponent

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

    this.serviceAgencia.getAgencias(function(agencias) {
      scope.agencias = agencias;
    });
    this.serviceAdicional.getPuertos(function(puertos) {
      scope.puertos = puertos;
    });
    this.serviceAdicional.getGiros(function(giros) {
      scope.giros = giros;
    });
    this.serviceAdicional.getTraficos(function(traficos) {
      scope.traficos = traficos;
    });
    this.setupFormNewBuque();
  }

  completeTable(){
    let table: DataTable[]=[]
    Object.entries(this.entradas).forEach(([_, value]) => {
      let data= new DataTable
      Object.entries(value).forEach(([key, dato]) => {
        if(key=='id'){
          data.giro=value.id
        }
        if(key=='entrada'){
          data.entrada=value.entrada
        }
        if(key=='salida'){
          data.salida=value.salida
        }
        if(key=='buque'){
          data.buque= this.buques.find(b=> b.orden==parseInt(value.buque)).nombre
        }
        if(key=='agencia'){
          data.agencia= this.agencias.find(b=> b.orden == parseInt(value.agencia)).agencia
        }
        if(key=='procedencia'){
          data.procedencia= this.puertos.find(b=> b.orden ==  parseInt(value.procedencia)).puerto
        }
        if(key=='destino'){
          data.destino= this.puertos.find(b=> b.orden ==  parseInt(value.destino)).puerto
        }
        if(key=='trafico'){
          data.trafico= this.traficos.find(b=> b.id ==  parseInt(value.trafico) || (parseInt(value.trafico)===0) || (value.trafico==null)).trafico
        }
        if(key=='documento'){
          data.documento= this.documentos.find(b=>(b.id ==  parseInt(value.documento) || (parseInt(value.documento)===0) )).documento
        }
        if(key=='muelle'){
          data.muelle= this.giros.find(b=> (b.orden ==  parseInt(value.muelle)) || (parseInt(value.muelle)===0)).muelle
        }
        if(key=='nroPasavante'){
          data.nroPasavante=value.nroPasavante
        }
        if(key=='cal_ent'){
          data.cal_ent=value.cal_ent
        }
        if(key=='cal_sal'){
          data.cal_sal=value.cal_sal
        }

      })
      if(data!= undefined){
        table.push(data)
      }
    });

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
    this.bandera=(this.banderas.find(b => b.orden === this.buqueSelect.bandera))
    this.arboladura= (this.arboladuras.find(b => b.codigo === this.buqueSelect.arboladura))
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

