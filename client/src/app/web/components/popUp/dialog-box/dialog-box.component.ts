// dialog-box.component.ts
import { Component, Inject, Optional, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import listaRubros from 'src/assets/json/rubro_esp.json';
import listaEmpresas from 'src/assets/json/emp_serv_port.json';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { User } from 'firebase';
export interface Data {
  rubro: Rubro;
  empresa: Empresa;
  id: number;
}
export interface Rubro {
  id: number;
  rubro_esp: string;
}
export interface Empresa {
  id: number;
  esp: string;
}

@Component({
  selector: 'app-dialog-box',
  templateUrl: './dialog-box.component.html',
  styleUrls: ['./dialog-box.component.css']
})
export class DialogBoxComponent  implements OnInit {
  myControl = new FormControl();
  options: any = listaRubros;
  filteredOptions: Observable<Rubro[]>;
  myControlE = new FormControl();
  optionsE: any = listaEmpresas;
  filteredOptionsE: Observable<Empresa[]>;

  action: string;
  local_data: any;

  constructor(
    public dialogRef: MatDialogRef<DialogBoxComponent>,
    // @Optional() is used to prevent error if no data is passed
    @Optional() @Inject(MAT_DIALOG_DATA) public data: Data) {
    console.log(data);
    this.local_data = {...data};
    this.action = this.local_data.action;
  }

  doAction() {
    this.dialogRef.close({event: this.action, data: this.local_data});
  }

  closeDialog() {
    this.dialogRef.close({event: 'Cancel'});
  }
  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => typeof value === 'string' ? value : value.rubro_esp),
        map(rubro_esp => rubro_esp ? this._filter(rubro_esp) : this.options.slice())
      );
    this.filteredOptionsE = this.myControlE.valueChanges
      .pipe(
        startWith(''),
        map(value => typeof value === 'string' ? value : value.esp),
        map(esp => esp ? this._filterE(esp) : this.optionsE.slice())
      );
  }

  displayFn(rubro?: Rubro): string | undefined {
    return rubro ? rubro.rubro_esp : undefined;
  }

  private _filter(name: string): User[] {
    const filterValue = name.toLowerCase();

    return this.options.filter(option => option.rubro_esp.toLowerCase().indexOf(filterValue) === 0);
  }
  //
  displayFnE(e?: Empresa): string | undefined {
    return e ? e.esp : undefined;
  }

  private _filterE(name: string): User[] {
    const filterValue = name.toLowerCase();

    return this.optionsE.filter(option => option.esp.toLowerCase().indexOf(filterValue) === 0);
  }
}
