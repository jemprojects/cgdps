import { AngularFireDatabase, AngularFireList } from "angularfire2/database";
import { Arboladura, Bandera } from '../models/simpleData';

import { Injectable } from "@angular/core";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class AditionalService {
  banderasRef: AngularFireList<Bandera> = null;
  banderas: any;
  arboladurasRef:AngularFireList<Arboladura> = null;
  arboladuras:any
  constructor(private db: AngularFireDatabase) {
    this.banderasRef = db.list("/banderas");
    this.arboladurasRef = db.list("/arboladura");
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
      .object(`banderas/${key}`)
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
  getArboladuras(onBanderasLoaded) {
    this.arboladurasRef
      .snapshotChanges()
      .pipe(
        map(changes =>
          changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
        )
      )
      .subscribe(arboladuras => {
        const listArboladuras = Array<Arboladura>();
        arboladuras.forEach(function(arboladura) {
          listArboladuras.push(new Arboladura(arboladura));
        });
        onBanderasLoaded(listArboladuras);
      }, this.handleError);
  }

  getArboladura(key: string, onLoaded) {
    return this.db
      .object(`arboladura/${key}`)
      .snapshotChanges()
      .subscribe(data => onLoaded(data.payload.val()));
  }

  createArboladura(arboladura: Arboladura, onSaved): void {
    this.arboladurasRef.push(arboladura).then(onSaved);
  }

  updateArboladura(key: string, value: any): void {
    this.arboladurasRef.update(key, value).catch(error => this.handleError(error));
  }

  deleteArboladura(key: string): void {
    this.arboladurasRef.remove(key).catch(error => this.handleError(error));
  }
  private handleError(error) {
    console.log(error);
  }

}
