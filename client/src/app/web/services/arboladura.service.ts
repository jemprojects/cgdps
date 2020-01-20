import { AngularFireDatabase, AngularFireList } from "angularfire2/database";

import { Arboladura } from "../models/arboladura";
import { Injectable } from "@angular/core";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class ArboladurasService {
  arboladurasRef: AngularFireList<Arboladura> = null;
  arboladuras: any;

  constructor(private db: AngularFireDatabase) {
    this.arboladurasRef = db.list("/arboladura");
  }
  getarboladuras(onarboladurasLoaded) {
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
        onarboladurasLoaded(listArboladuras);
      }, this.handleError);
  }

  getarboladura(key: string, onLoaded) {
    return this.db
      .object(`arboladura/${key}`)
      .snapshotChanges()
      .subscribe(data => onLoaded(data.payload.val()));
  }

  createarboladura(arboladura: Arboladura, onSaved): void {
    this.arboladurasRef.push(arboladura).then(onSaved);
  }

  updatearboladura(key: string, value: any): void {
    this.arboladurasRef.update(key, value).catch(error => this.handleError(error));
  }

  deletearboladura(key: string): void {
    this.arboladurasRef.remove(key).catch(error => this.handleError(error));
  }

  private handleError(error) {
    console.log(error);
  }}

