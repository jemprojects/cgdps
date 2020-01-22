import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { Arboladura } from '../../models/arboladura';
import { ArboladurasService } from '../../services/arboladura.service';
import { Bandera } from '../../models/bandera';
import { BanderasService } from '../../services/bandera.service';
import { Buques } from '../../models/buques';
import { BuquesService } from '../../services/buques.service';

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
  serviceArboladura: ArboladurasService;
  serviceBandera: BanderasService;
  arboladuras: Array<Arboladura>;
  banderas: Array<Bandera>;
  constructor(
    private route: Router,
    private ruteActive: ActivatedRoute,
    private serviceBuque: BuquesService,
    serviceBanderas: BanderasService,
    serviceArboladura: ArboladurasService
  ) {
    this.entradaKey = this.ruteActive.snapshot.paramMap.get('id');
    this.buqueInEdition = null;
    this.serviceArboladura= serviceArboladura
    this.serviceBandera=serviceBanderas
  }

  ngOnInit(): void {
    const scope = this;
    this.setupFormNewBuque();
    this.serviceArboladura.getarboladuras(function(arboladuras) {
      scope.arboladuras = arboladuras;

    });
    this.serviceBandera.getBanderas(function(banderas) {
      scope.banderas = banderas;

    });
  }
  backToEntradas(): void {
    this.route.navigate(['/cgpds/SolicitudGiro']);
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
      this.serviceBuque.createBuque(jsonBuque, () => {
        if (this.continueAdding) {
          this.setupFormNewBuque();
          this.scrollToTop();
        } else {
          this.backToEntradas();
        }
      });
    } else {
      this.serviceBuque.updateBuque(this.entradaKey, jsonBuque);
    }

  }
  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
