import { Component, HostListener, Input } from '@angular/core';

import { FormEntradaComponent } from '../../Formularios/form-entrada/form-entrada.component';

@Component({
  selector: 'app-entrada',
  templateUrl: './entrada.component.html',
  styleUrls: ['./entrada.component.css'],

})

export class EntradaComponent  {
  @Input() formEnt: FormEntradaComponent;

}
