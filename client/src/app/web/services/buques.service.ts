import { AngularFireDatabase, AngularFireList } from "angularfire2/database";

import { Buques } from "../models/buques";
import { Injectable } from "@angular/core";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class BuquesService {
  buquesRef: AngularFireList<Buques> = null;
  buques: any;

  constructor(private db: AngularFireDatabase) {
    this.buquesRef = db.list("/buques");
  }

  getBuques(onBuquesLoaded) {
    this.buquesRef
      .snapshotChanges()
      .pipe(
        map(changes =>
          changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
        )
      )
      .subscribe(buques => {
        const listBuques = Array<Buques>();
        buques.forEach(function(buque) {
          listBuques.push(new Buques(buque));
        });
        onBuquesLoaded(listBuques);
      }, this.handleError);
  }

  getBuque(key: string, onLoaded) {
    return this.db
      .object(`buques/${key}`)
      .snapshotChanges()
      .subscribe(data => onLoaded(data.payload.val()));
  }

  createBuque(Buque: Buques, onSaved): void {
    this.buquesRef.push(Buque).then(onSaved);
  }

  updateBuque(key: string, value: any): void {
    this.buquesRef.update(key, value).catch(error => this.handleError(error));
  }

  deleteBuque(key: string): void {
    this.buquesRef.remove(key).catch(error => this.handleError(error));
  }

  private handleError(error) {
    console.log(error);
  }
}
