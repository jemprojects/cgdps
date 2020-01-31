import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

import { Agencias } from '../../models/agencias';
import { AgenciasService } from '../../services/agencias.service';
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
  entradaKey: string
  enableAgenciaCreation = false
  isNew: boolean
  continueAdding = false
  service:AgenciasService
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  agencias: any=listaDeAgencias
  url='src/assets/json/agencias.json'
  constructor(
    private http: HttpClient,
    private route: Router,
    private ruteActive: ActivatedRoute,
    serviceAgencia: AgenciasService,
  ) {
    this.service=serviceAgencia
    this.entradaKey = this.ruteActive.snapshot.paramMap.get('id')
    this.agenciaInEdition = null
  }

  createAgencia(agenjson: Agencias): Observable<Agencias> {
    this.http.post(this.url, agenjson).toPromise().then((data:any) => {
      console.log(data);
      console.log(data.json.test);
    });
    return this.http.post<Agencias>(this.url, agenjson);
}
  ngOnInit(): void {
    this.setupFormNewAgencia()
  }
  backToEntradas(): void {
    this.route.navigate(['/cgpds'])
  }
  setupFormNewAgencia() {
    this.isNew = true
    this.enableAgenciaCreation = true
    this.formTitle = 'Agregar nueva agencia'
    this.agenciaInEdition = new Agencias({
      orden: this.entradaKey+1,
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
          this.backToEntradas()
        }
      })
    } else {
      this.service.updateAgencia(this.entradaKey, jsonAgencia)
    }

  }
  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}

