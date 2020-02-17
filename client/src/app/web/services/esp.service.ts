import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { EmpresaServPorts, Esp, Rubro } from '../models/simpleData';

import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EspService {

  rubrosRef:AngularFireList<Rubro> = null;
  rubros: any;

  empServPortRef:AngularFireList<EmpresaServPorts> = null;
  empServPorts: any;

  espsRef: AngularFireList<Esp> = null;
  esps:any
  constructor(private db: AngularFireDatabase) {
    this.rubrosRef = db.list('/rubros')
    this.espsRef = db.list('/esp')
    this.empServPortRef = db.list('/emp_serv_port')
  }
// service esp
getEsps(onBanderasLoaded) {
  this.espsRef
    .snapshotChanges()
    .pipe(
      map(changes =>
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    )
    .subscribe(esps => {
      const listEsps = Array<Esp>();
      esps.forEach(function(esp) {
        listEsps.push(new Esp(esp));
      });
      onBanderasLoaded(listEsps);
    }, this.handleError);
}
  getEsp(key: string, onLoaded) {
    return this.db
      .object(`esp/${key}`)
      .snapshotChanges()
      .subscribe(data => onLoaded(data.payload.val()));
  }

  createEsp(esp: Esp, onSaved): void {
    this.espsRef.push(esp).then(onSaved);
  }

  updateEsp(key: string, value: any): void {
    this.espsRef.update(key, value).catch(error => this.handleError(error));
  }

  deleteEsp(key: string): void {
    this.espsRef.remove(key).catch(error => this.handleError(error));
  }


   //Rubros
   getRubros(onTipoLoaded) {
    this.rubrosRef
      .snapshotChanges()
      .pipe(
        map(changes =>
          changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
        )
      )
      .subscribe(rubros => {
        const listRubros = Array<Rubro>();
        rubros.forEach(function(rubro) {
          listRubros.push(new Rubro(rubro));
        });
        onTipoLoaded(listRubros);
      }, this.handleError);
  }

  createRubro(rubro: Rubro, onSaved): void {
    this.rubrosRef.push(rubro).then(onSaved);
  }

  updateRubro(key: string, value: any): void {
    this.rubrosRef.update(key, value).catch(error => this.handleError(error));
  }

  deleteRubro(key: string): void {
    this.rubrosRef.remove(key).catch(error => this.handleError(error));
  }
  //empServPorts
  getEmpServPort(onTipoLoaded) {
    this.empServPortRef
      .snapshotChanges()
      .pipe(
        map(changes =>
          changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
        )
      )
      .subscribe(empServPorts => {
        const listempServPorts = Array<EmpresaServPorts>();
        empServPorts.forEach(function(empServPort) {
          listempServPorts.push(new EmpresaServPorts(empServPort));
        });
        onTipoLoaded(listempServPorts);
      }, this.handleError);
  }

  createEmpServPort(emp: EmpresaServPorts, onSaved): void {
    this.empServPortRef.push(emp).then(onSaved);
  }
  private handleError(error) {
    console.log(error);
  }
}
