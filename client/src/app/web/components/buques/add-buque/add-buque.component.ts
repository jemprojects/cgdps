import { ActivatedRoute, Router } from '@angular/router';
import { Arboladura, Bandera } from 'src/app/web/models/simpleData';
import { Component, OnChanges, OnInit } from '@angular/core';

import { BanderasService } from 'src/app/web/services/banderas.service';
import { Buques } from '../../../models/buques';
import { BuquesService } from '../../../services/buques.service';
import { DialogComponent } from '../../dialog/dialog.component';
import { MatDialog } from '@angular/material';
import listaDeArboladura from 'src/assets/json/arboladura.json';

@Component({
  selector: 'app-add-buque',
  templateUrl: './add-buque.component.html',
  styleUrls: ['./add-buque.component.css']
})
export class AddBuqueComponent implements OnInit {
  buqueInEdition: Buques;
  formTitle: string;
  entradaKey: string;
  enableBuqueCreation = false;
  isNew: boolean;
  continueAdding = false;
  service:BuquesService
  serviceAdd:BanderasService
  arboladuras: Array<Arboladura>;
  banderas: Array<Bandera>;
  orden_count: number
  dataSelect: {a: number, b: string};

  constructor(
    public dialog: MatDialog,
    private route: Router,
    private ruteActive: ActivatedRoute,
    serviceBuques: BuquesService,
    serviceAditional:BanderasService
  ) {
    this.service=serviceBuques
    this.serviceAdd=serviceAditional
    this.entradaKey = this.ruteActive.snapshot.paramMap.get('orden');
    this.buqueInEdition = null;
    this.banderas=[]
    this.arboladuras=[]
  }

  ngOnInit() {
    const scope = this;
    this.serviceAdd.getBanderas(function(banderas) {
    scope.banderas = banderas;
    });
    this.serviceAdd.getArboladuras(function(arboladuras) {
      scope.arboladuras = arboladuras;
      });
    this.setupFormNewBuque();
  }

  navigateTo(value) {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '250px',
      data:this.dataSelect
    });

    if (value == 'AgregarBandera') {

      dialogRef.afterClosed().subscribe(result => {
        if(result.event == 'Add'){
          this.addBandera(result.data);
        }

      });
    } else if(value== 'AgregarArboladura'){

      dialogRef.afterClosed().subscribe(result => {
        if(result.event == 'Add'){
          this.addArboladura(result.data);
        }

      });
    }
    return false;
  }
  addBandera(row_obj){
    this.orden_count=this.banderas[this.banderas.length -1].orden
    this.serviceAdd.createBandera({"orden": this.orden_count +1,"bandera":row_obj.name.toUpperCase()},()=>{})
  }
  addArboladura(row_obj){
    this.orden_count=this.banderas[this.banderas.length -1].orden
    this.serviceAdd.createArboladura({"codigo": this.orden_count +1,"arboladura":row_obj.name.toUpperCase()},()=>{})
  }
  backToEntradas(): void {
    this.route.navigate(['/cgpds']);
  }
  setupFormNewBuque() {
    this.isNew = true;
    this.enableBuqueCreation = true;
    this.formTitle = 'Agregar nueva buque';
    this.buqueInEdition = new Buques({
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
      imo: '',
      campo1: '',
    });
    }

  savebuque(buque) {
    const jsonBuque = buque;
    const keyout = 'key';
    delete jsonBuque[keyout];
    if (this.isNew) {
      this.service.createBuque(jsonBuque, () => {
        if (this.continueAdding) {
          this.setupFormNewBuque();
          this.scrollToTop();
        } else {
          this.backToEntradas();
        }
      });
    } else {
      this.service.updateBuque(this.entradaKey, jsonBuque);
    }

  }
  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
