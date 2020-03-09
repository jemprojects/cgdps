import { Component, OnInit } from '@angular/core';

import { Entrada } from 'src/app/web/models/entradas';

@Component({
  selector: 'app-edit-entrada',
  templateUrl: './edit-entrada.component.html',
  styleUrls: ['./edit-entrada.component.css']
})
export class EditEntradaComponent implements OnInit {
  entradaInEdition: Entrada;
  formTitle: string;
  entradaKey: string;
  constructor() { }

  ngOnInit() {
  }

}
