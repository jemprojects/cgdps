import { AngularFireDatabase, AngularFireList } from "angularfire2/database";

import { Injectable } from "@angular/core";
import { Operacion } from '../models/operacion';
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class OperacionsService {
  operacionsRef: AngularFireList<Operacion> = null;
  operacions: any;

  constructor(private db: AngularFireDatabase) {
    this.operacionsRef = db.list('/operacion');
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
    this.operacionsRef.update(key, value).catch(error => this.handleError(error));
  }

  deleteOperacion(key: string): void {
    this.operacionsRef.remove(key).catch(error => this.handleError(error));
  }

  private handleError(error) {
    console.log(error);
  }
}
