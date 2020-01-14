import { AngularFireDatabase, AngularFireList } from "angularfire2/database";

import { Injectable } from "@angular/core";
import { Trafico } from "../models/trafico";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class TraficoService {
  traficosRef: AngularFireList<Trafico> = null;
  traficos: any;

  constructor(private db: AngularFireDatabase) {
    this.traficosRef = db.list("/trafico");
  }
  getTraficos(onTraficosLoaded) {
    this.traficosRef
      .snapshotChanges()
      .pipe(
        map(changes =>
          changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
        )
      )
      .subscribe(traficos => {
        const listTraficos = Array<Trafico>();
        traficos.forEach(function(trafico) {
          listTraficos.push(new Trafico(trafico));
        });
        onTraficosLoaded(listTraficos);
      }, this.handleError);
  }

  getTrafico(key: string, onLoaded) {
    return this.db
      .object(`trafico/${key}`)
      .snapshotChanges()
      .subscribe(data => onLoaded(data.payload.val()));
  }

  createTrafico(trafico: Trafico, onSaved): void {
    this.traficosRef.push(trafico).then(onSaved);
  }

  updateTrafico(key: string, value: any): void {
    this.traficosRef.update(key, value).catch(error => this.handleError(error));
  }

  deleteTrafico(key: string): void {
    this.traficosRef.remove(key).catch(error => this.handleError(error));
  }

  private handleError(error) {
    console.log(error);
  }
}
