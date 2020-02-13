import { Component, Input, OnInit } from '@angular/core';
import { Mercaderia, Tipo } from '../../models/simpleData';

import { AditionalService } from '../../services/adicional.service';
import { DialogComponent } from '../popUp/dialog/dialog.component';
import { MatDialog } from '@angular/material';
import { Operacion } from '../../models/operacion';
import { OperacionsService } from '../../services/operacion.service';
import listaDeMercaderias from 'src/assets/json/mercaderias.json';
import listaDeOperaciones from 'src/assets/json/operacion.json';
import listaDeTipos from 'src/assets/json/tipo.json';

@Component({
  selector: 'app-operaciones',
  templateUrl: './operaciones.component.html',
  styleUrls: ['./operaciones.component.css']
})
export class OperacionesComponent implements OnInit {
    service: OperacionsService;
    @Input() giro_id: number;
    // operaciones
    operaciones: Array<Operacion> = listaDeOperaciones;
    impo: Operacion;
    expo: Operacion;
    // Mercadeira
    mercaderias: Array<Mercaderia> = listaDeMercaderias;
    // tipos
    tipos: Array<Tipo> = listaDeTipos;
    dataSimple: {id: number, name: string};
    orden_count: number;
    serviceAditional: AditionalService;
    idO: number = this.operaciones.pop().id;

    checked = false;

  constructor(public dialog: MatDialog, Oservice: OperacionsService, servAdi: AditionalService) {
    this.service = Oservice;
    this.serviceAditional = servAdi;
    this.impo = null;
    this.expo = null;
  }

  navigateTo(value) {
    if (value === 'AgregarTipo') {
      const dialogRef = this.dialog.open(DialogComponent, {
        width: '250px',
        data: {data: this.dataSimple, title: 'Tipo'},

      });

      dialogRef.afterClosed().subscribe(result => {
        if (result.event == 'Add') {
          this.addTipo(result.data);
        }

      });
    } else if (value === 'AgregarMercaderia') {
      const dialogRef = this.dialog.open(DialogComponent, {
        width: '250px',
        data: {data: this.dataSimple, title: 'Mercaderia'},

      });

      dialogRef.afterClosed().subscribe(result => {
        if (result.event == 'Add') {
          this.addMercaderia(result.data);
        }

      });
    }
    return false;
  }
  addTipo(row_obj) {
      this.orden_count = this.tipos[this.tipos.length - 1].id + 1;
      this.serviceAditional.createTipo({'id': this.orden_count, 'tipo': row_obj.name.toUpperCase()}, () => {});
  }
  addMercaderia(row_obj) {
    this.orden_count = this.mercaderias[this.mercaderias.length - 1].orden + 1;
    this.serviceAditional.createMercaderia({'orden': this.orden_count, 'tipo': row_obj.name.toUpperCase()}, () => {});

}
  ngOnInit() {
    const scope = this;
    this.service.getOperacions(function(operaciones) { scope.operaciones = operaciones;});
    this.serviceAditional.getTipos(tipos => scope.tipos = tipos);
    this.serviceAditional.getMercaderias(mercaderias => scope.mercaderias = mercaderias);
    this.setupFormNewOperation();
  }

  getTotal(n1, n2) {
    // tslint:disable-next-line: radix
    return parseInt(n1) + parseInt(n2);
  }

  setupFormNewOperation() {
    this.impo = new Operacion({
      id: this.idO + 1,
      mercaderia: '',
      tns: 0,
      tipo: '',
      giro_id: this.giro_id
    });
    this.expo = new Operacion({
      id: this.impo.id + 1,
      mercaderia: '',
      tns: 0,
      tipo: '',
      giro_id: this.giro_id
    });
    this.idO = this.expo.id + 1;
  }
  saveOperation(impo, expo) {

    if (this.checked) {
      this.service.createOperacion(impo, () => {});
      this.service.createOperacion(expo, () => {});
    }

  }
}
