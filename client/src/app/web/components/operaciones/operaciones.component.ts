import { Component, OnInit } from '@angular/core';

import { Operacion } from '../../models/operacion';
import { OperacionsService } from '../../services/operacion.service';
import listaDeMercaderias from 'src/assets/json/mercaderias.json';
import listaDeTipos from 'src/assets/json/tipo.json';

@Component({
  selector: 'app-operaciones',
  templateUrl: './operaciones.component.html',
  styleUrls: ['./operaciones.component.css']
})
export class OperacionesComponent implements OnInit {
    service: OperacionsService
    //operaciones
    operaciones: Array<Operacion>;
    impo: Operacion
    expo: Operacion
    // Mercadeira
    mercaderias: any=listaDeMercaderias;
    //tipos
    tipos: any=listaDeTipos;

  constructor(Oservice: OperacionsService) {
    this.service=Oservice
    this.impo=null
    this.expo=null
  }


  ngOnInit() {
    const scope=this
    this.service.getOperacions(operaciones=> scope.operaciones = operaciones);
    this.setupFormNewOperation()
  }
  getTotal(n1,n2){

    return parseInt(n1) + parseInt(n2)

  }
  setupFormNewOperation() {
    this.impo=new Operacion({
      id:'',
      mercaderia:'',
      tns:0,
      tipo: '',
      giro_id:''
    });
    this.expo=new Operacion({
      id:'',
      mercaderia:'',
      tns:0,
      tipo: '',
      giro_id:''
    });
  }
}
