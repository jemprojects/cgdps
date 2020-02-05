import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

import { Agencias } from '../../../models/agencias';
import { AgenciasService } from '../../../services/agencias.service';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs';
import listaDeAgencias from 'src/assets/json/agencias.json';

@Component({
  selector: 'app-add-agencia',
  templateUrl: './add-agencia.component.html',
  styleUrls: ['./add-agencia.component.css']
})
export class AddAgenciaComponent implements OnInit {
  agenciaInEdition: Agencias
  formTitle: string
  agenciaKey: string
  enableAgenciaCreation = false
  isNew: boolean
  continueAdding = false
  service:AgenciasService
  id_newAgencia:number=147
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  constructor(
    private route: Router,
    private ruteActive: ActivatedRoute,
    serviceAgencia: AgenciasService,
  ) {
    this.service=serviceAgencia
    this.agenciaInEdition = null

  }

  ngOnInit(): void {
    this.agenciaKey = this.ruteActive.snapshot.paramMap.get('id')
    if(this.agenciaKey==='null'){
      this.id_newAgencia++
      this.setupFormNewAgencia()
    }else{
      this.setupFormEditAgencia()
    }

  }
  backToEntrada(): void {
    this.route.navigate(['/cgpds'])
  }
  setupFormEditAgencia(){
    this.isNew = false
    this.service.getAgencia(this.agenciaKey, data => {
      this.agenciaInEdition = new Agencias(data)
      this.formTitle = `Editar Agencia ${this.agenciaInEdition.agencia}`
    })
  }
  setupFormNewAgencia() {
    this.isNew = true
    this.enableAgenciaCreation = true
    this.formTitle = 'Agregar nueva agencia'
    this.agenciaInEdition = new Agencias({
      orden: this.id_newAgencia,
      agencia: '',
      cuit:'',
      direccion: '',
      telefono: '',
      mail:'',
    })
    }

  saveAgencia(agencia) {
    const jsonAgencia = agencia
    const keyout = 'key'
    delete jsonAgencia[keyout]
    if (this.isNew) {
      this.service.createAgencia(jsonAgencia, () => {
        if (this.continueAdding) {
          this.setupFormNewAgencia()
          this.scrollToTop()
        } else {
          this.backToEntrada()
        }
      })
    } else {
      this.service.updateAgencia(this.agenciaKey, jsonAgencia)
    }

  }
  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}

