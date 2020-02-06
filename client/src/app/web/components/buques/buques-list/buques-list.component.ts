import { Arboladura, Bandera } from 'src/app/web/models/simpleData';
import { Component, OnInit } from '@angular/core';

import { AditionalService } from 'src/app/web/services/adicional.service';
import { Buques } from 'src/app/web/models/buques';
import { BuquesService } from 'src/app/web/services/buques.service';
import { DialogComponent } from '../../popUp/dialog/dialog.component';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
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
  buqueInEdition: Buques;
  buques: Array<Buques>;
  dataSource = ELEMENT_DATA;
  buqueSelect: Buques;
  serviceAdd: AditionalService;
  arboladuras: Array<Arboladura>;
  banderas: Array<Bandera>;
  orden_count: number;
  dataSelect: {a: number, b: string};
  myControl = new FormControl();

  constructor(public dialog: MatDialog,
              private router: Router,
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
      this.setupFormNewBuque()
  }

  setupFormNewBuque() {
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
      imo: ''
    });
    this.buqueSelect = this.buques.find(b => b.orden == this.buqueInEdition.orden);
  }
  navigateTo(value) {
    if (value === 'AgregarBuque') {
      this.router.navigate([`cgpds/${value}/null`]);
      console.log(typeof(value))
    }
    else {
      this.buqueSelect = this.buques.find(b => b.orden == this.buqueInEdition.orden);
    }
    return false;
  }
  addBandera(row_obj) {
    this.orden_count = this.banderas[this.banderas.length - 1].orden;
    this.serviceAdd.createBandera({'orden': this.orden_count + 1,'bandera': row_obj.name.toUpperCase()}, () => {});
  }
  addArboladura(row_obj) {
    this.orden_count = this.banderas[this.banderas.length - 1].orden;
    this.serviceAdd.createArboladura({'codigo': this.orden_count + 1,'arboladura': row_obj.name.toUpperCase()}, () => {});
  }
  getBanderaName(element) {
    return ((this.banderas.find(b => b.orden === element)).bandera);
  }
  getArboladuraName(element) {
    return ((this.arboladuras.find(b => b.codigo == element)).arboladura);
  }
}

