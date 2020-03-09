import { ActivatedRoute, Router } from '@angular/router';
import { Arboladura, Bandera } from 'src/app/web/models/simpleData';
import { Component, OnInit } from '@angular/core';

import { AditionalService } from 'src/app/web/services/adicional.service';
import { Buques } from '../../../models/buques';
import { BuquesService } from '../../../services/buques.service';
import { DialogComponent } from '../../popUp/dialog/dialog.component';
import { MatDialog } from '@angular/material';
import listaDeArboladura from 'src/assets/json/arboladura.json';
import listaDeBanderas from 'src/assets/json/bandera.json';

@Component({
  selector: 'app-add-buque',
  templateUrl: './add-buque.component.html',
  styleUrls: ['./add-buque.component.css']
})
export class AddBuqueComponent implements OnInit {
  continueAdding = false;
  buqueInEdition: Buques;
  formTitle: string;
  buqueKey: string;
  enableBuqueCreation = false;
  isNew: boolean;
  arboladuras: Array<Arboladura> = listaDeArboladura;
  banderas: Array<Bandera>;
  orden_count: number;
  dataSimple: { id: number; name: string; title: string };
  buques: Array<Buques>;
  id_newBque = 3061;
  constructor(
    public dialog: MatDialog,
    private route: Router,
    private ruteActive: ActivatedRoute,
    private serviceBuques: BuquesService,
    private serviceAditional: AditionalService
  ) {
    this.buqueInEdition = null;
  }

  ngOnInit() {
    this.buqueKey = this.ruteActive.snapshot.paramMap.get('id');
    if (this.buqueKey === 'null') {
      this.id_newBque++;
      this.setupFormNewBuque();
    } else {
      this.setupFormEditBuque();
    }
    const scope = this;
    this.serviceBuques.getBuques(function(buques) {
      scope.buques = buques;
    });
    this.serviceAditional.getBanderas(function(banderas) {
      scope.banderas = banderas;
    });
    this.serviceAditional.getArboladuras(function(arboladuras) {
      scope.arboladuras = arboladuras;
    });
  }

  navigateTo(value) {
    if (value == 'AgregarBandera') {
      const dialogRef = this.dialog.open(DialogComponent, {
        width: '250px',
        data: { data: this.dataSimple, title: 'Bandera' }
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result.event == 'Add') {
          this.addBandera(result.data);
        }
      });
    } else if (value == 'AgregarArboladura') {
      const dialogRef = this.dialog.open(DialogComponent, {
        width: '250px',
        data: { data: this.dataSimple, title: 'Arboladura' }
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result.event == 'Add') {
          this.addArboladura(result.data);
        }
      });
    }
    return false;
  }
  addBandera(row_obj) {
    this.orden_count = this.banderas[this.banderas.length - 1].orden + 1;
    this.serviceAditional.createBandera(
      { orden: this.orden_count, bandera: row_obj.name.toUpperCase() },
      () => {}
    );
    this.serviceAditional.getBanderas(banderas =>
      this.banderas = banderas
    );

  }
  addArboladura(row_obj) {
    this.orden_count = this.banderas[this.banderas.length - 1].orden + 1;
    this.serviceAditional.createArboladura(
      { codigo: this.orden_count, arboladura: row_obj.name.toUpperCase() },
      () => {}
    );
  }
  backToEntradas(): void {
    window.close();
  }

  setupFormEditBuque() {
    this.isNew = false;
    this.serviceBuques.getBuque(this.buqueKey, data => {
      this.buqueInEdition = new Buques(data);
      this.formTitle = `Editar Buque ${this.buqueInEdition.nombre}`;
    });
  }

  setupFormNewBuque() {
    this.isNew = true;
    this.enableBuqueCreation = true;
    this.formTitle = 'Agregar nuevo buque';
    this.buqueInEdition = new Buques({
      orden: this.id_newBque,
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
  savebuque(buque) {
    const jsonBuque = buque;
    const keyout = 'key';
    delete jsonBuque[keyout];
    if (this.isNew) {
      this.serviceBuques.createBuque(jsonBuque, () => {
        if (this.continueAdding) {
          this.setupFormNewBuque();
          this.scrollToTop();
        } else {
          this.backToEntradas();
        }
      });
    } else {
      this.serviceBuques.updateBuque(this.buqueKey, jsonBuque);
      this.backToEntradas();
    }
  }
  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
