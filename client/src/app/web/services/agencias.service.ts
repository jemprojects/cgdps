import { AngularFireDatabase, AngularFireList } from "angularfire2/database";

import { Agencias } from "../models/agencias";
import { Injectable } from "@angular/core";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class AgenciasService {
  agenciasRef: AngularFireList<Agencias> = null;
  agencias: any;

  constructor(private db: AngularFireDatabase) {
    this.agenciasRef = db.list("/agencias");
  }
  getAgencias(onagenciasLoaded) {
    this.agenciasRef
      .snapshotChanges()
      .pipe(
        map(changes =>
          changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
        )
      )
      .subscribe(agencias => {
        const listagencias = Array<Agencias>();
        agencias.forEach(function(agencia) {
          listagencias.push(new Agencias(agencia));
        });
        onagenciasLoaded(listagencias);
      }, this.handleError);
  }

  getAgencia(key: string, onLoaded) {
    return this.db
      .object(`agencias/${key}`)
      .snapshotChanges()
      .subscribe(data => onLoaded(data.payload.val()));
  }

  createAgencia(agencia: Agencias, onSaved): void {
    this.agenciasRef.push(agencia).then(onSaved);
  }

  updateAgencia(key: string, value: any): void {
    this.agenciasRef.update(key, value).catch(error => this.handleError(error));
  }

  deleteAgencia(key: string): void {
    this.agenciasRef.remove(key).catch(error => this.handleError(error));
  }

  private handleError(error) {
    console.log(error);
  }
}
