import { AngularFireDatabase, AngularFireList } from "angularfire2/database";
import { Mercaderia, Operacion, Tipo } from "../models/operacion";

import { Injectable } from "@angular/core";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class OperacionsService {
  operacionsRef: AngularFireList<Operacion> = null;
  operacions: any;
  mercaderiasRef: AngularFireList<Mercaderia> = null;
  mercaderias: any;

  tiposRef: AngularFireList<Tipo> = null;
  tipos: any;
  constructor(private db: AngularFireDatabase) {
    this.operacionsRef = db.list("/operaciones");
    this.tiposRef = db.list("/tipos");
    this.mercaderiasRef = db.list("/mercaderias");
  }
  getOperacions(onOperacionsLoaded) {
    this.operacionsRef
      .snapshotChanges()
      .pipe(
        map(changes =>
          changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
        )
      )
      .subscribe(operacions => {
        const listOperacions = Array<Operacion>();
        operacions.forEach(function(operacion) {
          listOperacions.push(new Operacion(operacion));
        });
        onOperacionsLoaded(listOperacions);
      }, this.handleError);
  }

  getOperacion(key: string, onLoaded) {
    return this.db
      .object(`operacion/${key}`)
      .snapshotChanges()
      .subscribe(data => onLoaded(data.payload.val()));
  }

  createOperacion(operacion: Operacion, onSaved): void {
    this.operacionsRef.push(operacion).then(onSaved);
  }

  updateOperacion(key: string, value: any): void {
    this.operacionsRef
      .update(key, value)
      .catch(error => this.handleError(error));
  }

  deleteOperacion(key: string): void {
    this.operacionsRef.remove(key).catch(error => this.handleError(error));
  }

  private handleError(error) {
    console.log(error);
  }
  //Tipos
  getTipos(onTipoLoaded) {
    this.tiposRef
      .snapshotChanges()
      .pipe(
        map(changes =>
          changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
        )
      )
      .subscribe(tipos => {
        const listTipos = Array<Tipo>();
        tipos.forEach(function(tipo) {
          listTipos.push(new Tipo(tipo));
        });
        onTipoLoaded(listTipos);
      }, this.handleError);
  }

  getTipo(key: string, onLoaded) {
    return this.db
      .object(`tipos/${key}`)
      .snapshotChanges()
      .subscribe(data => onLoaded(data.payload.val()));
  }

  createTipo(tipo: Tipo, onSaved): void {
    this.tiposRef.push(tipo).then(onSaved);
  }
  //Mercaderias
  getMercaderias(onTipoLoaded) {
    this.mercaderiasRef
      .snapshotChanges()
      .pipe(
        map(changes =>
          changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
        )
      )
      .subscribe(mercaderias => {
        const listMercaderias = Array<Mercaderia>();
        mercaderias.forEach(function(mercaderia) {
          listMercaderias.push(new Mercaderia(mercaderia));
        });
        onTipoLoaded(listMercaderias);
      }, this.handleError);
  }

  createMercaderia(mercaderia: Mercaderia, onSaved): void {
    this.mercaderiasRef.push(mercaderia).then(onSaved);
  }
}
