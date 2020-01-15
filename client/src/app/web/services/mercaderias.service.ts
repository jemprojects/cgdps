import { AngularFireDatabase, AngularFireList } from "angularfire2/database";

import { Injectable } from "@angular/core";
import { Mercaderia } from '../models/mercaderia';
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class MercaderiasService {
  mercaderiasRef: AngularFireList<Mercaderia> = null;
  mercaderias: any;

  constructor(private db: AngularFireDatabase) {
    this.mercaderiasRef = db.list("/mercaderias");
  }
  getMercaderias(onMercaderiasLoaded) {
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
        onMercaderiasLoaded(listMercaderias);
      }, this.handleError);
  }

  getMercaderia(key: string, onLoaded) {
    return this.db
      .object(`mercaderias/${key}`)
      .snapshotChanges()
      .subscribe(data => onLoaded(data.payload.val()));
  }

  createMercaderia(mercaderia: Mercaderia, onSaved): void {
    this.mercaderiasRef.push(mercaderia).then(onSaved);
  }

  updateMercaderia(key: string, value: any): void {
    this.mercaderiasRef.update(key, value).catch(error => this.handleError(error));
  }

  deleteMercaderia(key: string): void {
    this.mercaderiasRef.remove(key).catch(error => this.handleError(error));
  }

  private handleError(error) {
    console.log(error);
  }
}
