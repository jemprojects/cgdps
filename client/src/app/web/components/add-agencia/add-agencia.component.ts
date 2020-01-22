import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

import { Agencias } from '../../models/agencias';
import { AgenciasService } from '../../services/agencias.service';
import { Entrada } from '../../models/entradas';

@Component({
  selector: 'app-add-agencia',
  templateUrl: './add-agencia.component.html',
  styleUrls: ['./add-agencia.component.css']
})
export class AddAgenciaComponent implements OnInit {
  agenciaInEdition: Agencias
  formTitle: string
  entradaKey: string
  enableAgenciaCreation = false
  isNew: boolean
  continueAdding = false

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  constructor(
    private route: Router,
    private ruteActive: ActivatedRoute,
    private serviceAgencia: AgenciasService,
  ) {
    this.entradaKey = this.ruteActive.snapshot.paramMap.get('id')
    this.agenciaInEdition = null
  }

  ngOnInit(): void {
    this.setupFormNewTransaction()
  }
  backToEntradas(): void {
    this.route.navigate(['/cgpds/SolicitudGiro'])
  }
  setupFormNewTransaction() {
    this.isNew = true
    this.enableAgenciaCreation = true
    this.formTitle = 'Agregar nueva agencia'
    this.agenciaInEdition = new Agencias({
      orden: '',
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
      this.serviceAgencia.createAgencia(jsonAgencia, () => {
        if (this.continueAdding) {
          this.setupFormNewTransaction()
          this.scrollToTop()
        } else {
          this.backToEntradas()
        }
      })
    } else {
      this.serviceAgencia.updateAgencia(this.entradaKey, jsonAgencia)
    }
    
  }
  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}
