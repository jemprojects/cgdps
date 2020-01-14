import { AngularFireDatabase, AngularFireList } from "angularfire2/database";

import { Giros } from "../models/giros";
import { Injectable } from "@angular/core";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class GirosService {
  girosRef: AngularFireList<Giros> = null;
  giros: any;

  constructor(private db: AngularFireDatabase) {
    this.girosRef = db.list("/giros");
  }
  getGiros(ongirosLoaded) {
    this.girosRef
      .snapshotChanges()
      .pipe(
        map(changes =>
          changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
        )
      )
      .subscribe(giros => {
        const listgiros = Array<Giros>();
        giros.forEach(function(giro) {
          listgiros.push(new Giros(giro));
        });
        ongirosLoaded(listgiros);
      }, this.handleError);
  }

  getGiro(key: string, onLoaded) {
    return this.db
      .object(`giros/${key}`)
      .snapshotChanges()
      .subscribe(data => onLoaded(data.payload.val()));
  }

  createGiro(Giro: Giros, onSaved): void {
    this.girosRef.push(Giro).then(onSaved);
  }

  updateGiro(key: string, value: any): void {
    this.girosRef.update(key, value).catch(error => this.handleError(error));
  }

  deleteGiro(key: string): void {
    this.girosRef.remove(key).catch(error => this.handleError(error));
  }

  private handleError(error) {
    console.log(error);
  }
}
