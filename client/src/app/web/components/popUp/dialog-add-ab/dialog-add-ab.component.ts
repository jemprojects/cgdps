import { ActivatedRoute, Router } from '@angular/router';
import { Arboladura, Bandera } from 'src/app/web/models/simpleData';
import { Component, OnInit } from '@angular/core';

import { AditionalService } from 'src/app/web/services/adicional.service';
import { Buques } from '../../../models/buques';
import { BuquesService } from '../../../services/buques.service';
import { DialogComponent } from '../../popUp/dialog/dialog.component';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-dialog-add-ab',
  templateUrl: './dialog-add-ab.component.html',
  styleUrls: ['./dialog-add-ab.component.css']
})
export class DialogAddABComponent implements OnInit {
  continueAdding = false;
  buqueInEdition: Buques;
  service: BuquesService;
  formTitle: string;
  buqueKey: string;
  enableBuqueCreation = false;
  isNew: boolean;
  serviceAdd: AditionalService;
  arboladuras: Array<Arboladura>;
  banderas: Array<Bandera>;
  dataSimple: {id: number, name: string, title: string};
  buques: Array<Buques>;
  constructor(
    public dialog: MatDialog,
    private route: Router,
    private ruteActive: ActivatedRoute,
    serviceBuques: BuquesService,
    serviceAditional: AditionalService
  ) {
    this.service = serviceBuques;
    this.serviceAdd = serviceAditional;
    this.buqueInEdition = null;
    this.banderas = [];
    this.arboladuras = [];

  }

  ngOnInit() {
    this.buqueKey = this.ruteActive.snapshot.paramMap.get('id');
    if (this.buqueKey === 'null') {
      this.setupFormNewBuque();
    } else {
      this.setupFormEditBuque();
    }
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

  navigateTo(value) {
    if (value == 'AgregarBandera') {
      const dialogRef = this.dialog.open(DialogComponent, {
        width: '250px',
        data: {data: this.dataSimple, title:'Bandera'},
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result.event == 'Add') {
          this.addBandera(result.data);
        }

      });
    } else if (value == 'AgregarArboladura') {
      const dialogRef = this.dialog.open(DialogComponent, {
        width: '250px',
        data: {data: this.dataSimple, title:'Arboladura'},
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
    let orden_count = this.banderas[this.banderas.length - 1].orden + 1;
    this.serviceAdd.createBandera({orden: orden_count,bandera: row_obj.name.toUpperCase()}, () => {});
  }
  addArboladura(row_obj) {
    let orden_count = this.banderas[this.banderas.length - 1].orden + 1;
    this.serviceAdd.createArboladura({codigo: orden_count,arboladura: row_obj.name.toUpperCase()}, () => {});
  }
  backToEntradas(): void {
    this.route.navigate(['/cgpds']);
  }

  setupFormEditBuque() {
    this.isNew = false;
    this.service.getBuque(this.buqueKey, data => {
      this.buqueInEdition = new Buques(data);
      this.formTitle = `Editar Buque ${this.buqueInEdition.nombre}`;
    });
  }

  setupFormNewBuque() {
    this.isNew = true;
    this.enableBuqueCreation = true;
    let id_newBque = this.buques[this.buques.length - 1].orden + 1;
    this.formTitle = 'Agregar nuevo buque';
    this.buqueInEdition = new Buques({
      orden: id_newBque,
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
      this.service.createBuque(jsonBuque, () => {
        if (this.continueAdding) {
          this.setupFormNewBuque();
          this.scrollToTop();
        } else {
          this.backToEntradas();
        }
      });
    } else {
      this.service.updateBuque(this.buqueKey, jsonBuque);
      this.backToEntradas();
    }

  }
  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
