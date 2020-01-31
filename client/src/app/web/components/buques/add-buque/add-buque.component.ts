import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { Buques } from '../../../models/buques';
import { BuquesService } from '../../../services/buques.service';
import listaDeArboladura from 'src/assets/json/arboladura.json';
import listaDeBanderas from 'src/assets/json/bandera.json';

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
  arboladuras: any= listaDeArboladura;
  banderas: any= listaDeBanderas;
  constructor(
    private route: Router,
    private ruteActive: ActivatedRoute,
    serviceBuques: BuquesService,
  ) {
    this.service=serviceBuques
    this.entradaKey = this.ruteActive.snapshot.paramMap.get('id');
    this.buqueInEdition = null;
  }

  ngOnInit(): void {
    this.setupFormNewBuque();
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
