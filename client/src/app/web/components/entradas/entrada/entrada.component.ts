import { Component, OnInit } from '@angular/core';

import { Agencias } from 'src/app/web/models/agencias';
import { AgenciasService } from 'src/app/web/services/agencias.service';
import { Buques } from 'src/app/web/models/buques';
import { BuquesService } from 'src/app/web/services/buques.service';
import { Entrada } from 'src/app/web/models/entradas';
import { EntradasService } from 'src/app/web/services/entradas.service';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import listaDeGiros from 'src/assets/json/giros.json';
import listaDePuertos from 'src/assets/json/puertos.json';
import listaDeTrafico from 'src/assets/json/trafico.json';

@Component({
  selector: 'app-entrada',
  templateUrl: './entrada.component.html',
  styleUrls: ['./entrada.component.css'],

})

export class EntradaComponent implements OnInit {
  date = new FormControl(new Date());
  entradas: Array<Entrada>;
  // Listas
  buques: Array<Buques>;
  puertos: any=listaDePuertos;
  agencias: Array<Agencias>
  giros: any=listaDeGiros;
  traficos: any=listaDeTrafico;
  buqueSelect: Buques
  // Entradas
  entradaKey: string;
  entradaInEdition: Entrada;
  isNew: boolean;
  siteMapLabel: string;
  // Servicios
  service: EntradasService;
  serviceBuque: BuquesService
  serviceAgencia: AgenciasService

  constructor( private router: Router,
               serviceEntrada: EntradasService,
               serviceBuque: BuquesService,
               serviceAgencia: AgenciasService) {

      this.entradaInEdition = null;
      this.service = serviceEntrada;
      this.serviceAgencia= serviceAgencia;
      this.serviceBuque= serviceBuque;
      this.entradas = null;
      this.buques=null;
      this.agencias=null;

    }
  navigateTo(value, id) {
    if (value === 'AgregarBuque' || value === 'AgregarAgencia') {
        this.router.navigate([`cgpds/${value}/${id}`]);
    }
    return false;
  }
  ngOnInit() {

    const scope = this;
    this.serviceBuque.getBuques(function(buques) {
      scope.buques = buques
    });
    this.serviceAgencia.getAgencias(function(agencias) {
      scope.agencias = agencias
    });
    this.setupFormNewEntrada();
  }
  setupFormEditEntrada() {
    this.isNew = false;
    this.service.getEntrada(this.entradaKey, data => {
      this.entradaInEdition = new Entrada(data);
    });
  }

  setupFormNewEntrada() {
    this.isNew = true;
    this.entradaInEdition = new Entrada({
      id: '',
      giro: '',
      buque: '',
      agencia: '',
      procedencia: '',
      destino: '',
      entrada: new Date(),
      salida: new Date(),
      trafico: '',
      muelle: '',
      documento: '',
      nroPasavante: '',
      cal_ent: '',
      cal_sal: '',
      envase_desc: '',
      empresa_desc: '',
      carga: '',
      tns_carga: '',
      envase_carg: '',
      empresa_car: '',
      cal_ent1: '',
      cal_sal1: '',
      tipo: ''
    });
  }



}
