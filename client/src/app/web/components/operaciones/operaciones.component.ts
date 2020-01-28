import { Component, OnInit } from '@angular/core';

import { Mercaderia } from '../../models/mercaderia';
import { MercaderiasService } from '../../services/mercaderias.service';
import { Operacion } from '../../models/operacion';
import { OperacionsService } from '../../services/operacion.service';
import { Tipo } from '../../models/tipo';
import { TipoService } from '../../services/tipo.service';

@Component({
  selector: 'app-operaciones',
  templateUrl: './operaciones.component.html',
  styleUrls: ['./operaciones.component.css']
})
export class OperacionesComponent implements OnInit {
    //operaciones
    operacionesService: OperacionsService;
    operaciones: Array<Operacion>;
    impo:Operacion
    expo:Operacion
    // Mercadeira
    mercaderiaService: MercaderiasService;
    mercaderias: Array<Mercaderia>;
    //tipos
    tipoService: TipoService;
    tipos: Array<Tipo>;

  constructor(
    serviceOperations: OperacionsService,
    serviceTipos: TipoService,
    serviceMercaderia: MercaderiasService,
  ) {
    this.operacionesService= serviceOperations
    this.tipoService= serviceTipos
    this.mercaderiaService = serviceMercaderia;
    this.impo=null
    this.expo=null
  }

  setupFormNewOperation() {
    this.impo=new Operacion({
      id:'',
      mercaderia:'',
      tns:'',
      tipo: '',
      giro_id:''
    });
    this.expo=new Operacion({
      id:'',
      mercaderia:'',
      tns:'',
      tipo: '',
      giro_id:''
    });
  }

  ngOnInit() {
    this.setupFormNewOperation()
    const scope=this
    this.mercaderiaService.getMercaderias(function(mercaderias) {
      scope.mercaderias = mercaderias;
    });
    this.operacionesService.getOperacions(function(operaciones) {
      scope.operaciones = operaciones;
    });
    this.tipoService.getTipos(function(tipos) {
      scope.tipos = tipos;
    });
  }

}
