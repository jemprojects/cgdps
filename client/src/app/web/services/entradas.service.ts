import { AngularFireDatabase, AngularFireList } from "angularfire2/database";

import { Entrada } from "../models/entradas";
import { Injectable } from "@angular/core";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class EntradasService {
  entradasRef: AngularFireList<Entrada> = null;
  entradas: any;

  constructor(private db: AngularFireDatabase) {
    this.entradasRef = db.list("/entradas/2019");
  }
  getEntradas(onentradasLoaded) {
    this.entradasRef
      .snapshotChanges()
      .pipe(
        map(changes =>
          changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
        )
      )
      .subscribe(entradas => {
        const listEntradas = Array<Entrada>();
        entradas.forEach(function(entrada) {
          listEntradas.push(new Entrada(entrada));
        });
        onentradasLoaded(listEntradas);
      }, this.handleError);
  }

  getEntrada(key: string, onLoaded) {
    return this.db
      .object(`entradas/2019/${key}`)
      .snapshotChanges()
      .subscribe(data => onLoaded(data.payload.val()));
  }

  createEntrada(entrada: Entrada, onSaved): void {
    this.entradasRef.push(entrada).then(onSaved);
  }

  updateEntrada(key: string, value: any): void {
    this.entradasRef.update(key, value).catch(error => this.handleError(error));
  }

  deleteEntrada(key: string): void {
    this.entradasRef.remove(key).catch(error => this.handleError(error));
  }

  private handleError(error) {
    console.log(error);
  }
}
