import { AngularFireDatabase, AngularFireList } from "angularfire2/database";

import { Bandera } from "../models/Bandera";
import { Injectable } from "@angular/core";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class BanderasService {
  banderasRef: AngularFireList<Bandera> = null;
  banderas: any;

  constructor(private db: AngularFireDatabase) {
    this.banderasRef = db.list("/bandera");
  }
  getBanderas(onBanderasLoaded) {
    this.banderasRef
      .snapshotChanges()
      .pipe(
        map(changes =>
          changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
        )
      )
      .subscribe(banderas => {
        const listBanderas = Array<Bandera>();
        banderas.forEach(function(bandera) {
          listBanderas.push(new Bandera(bandera));
        });
        onBanderasLoaded(listBanderas);
      }, this.handleError);
  }

  getBandera(key: string, onLoaded) {
    return this.db
      .object(`bandera/${key}`)
      .snapshotChanges()
      .subscribe(data => onLoaded(data.payload.val()));
  }
  
  createBandera(bandera: Bandera, onSaved): void {
    this.banderasRef.push(bandera).then(onSaved);
  }

  updateBandera(key: string, value: any): void {
    this.banderasRef.update(key, value).catch(error => this.handleError(error));
  }

  deleteBandera(key: string): void {
    this.banderasRef.remove(key).catch(error => this.handleError(error));
  }

  private handleError(error) {
    console.log(error);
  }}

