import { AngularFireDatabase, AngularFireList } from "angularfire2/database";

import { Injectable } from "@angular/core";
import { Tipo } from '../models/tipo';
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class TipoService {
  tipoRef: AngularFireList<Tipo> = null;
  tipo: any;

  constructor(private db: AngularFireDatabase) {
    this.tipoRef = db.list("/tipo");
  }
  getTipos(onTipoLoaded) {
    this.tipoRef
      .snapshotChanges()
      .pipe(
        map(changes =>
          changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
        )
      )
      .subscribe(tipo => {
        const listTipo = Array<Tipo>();
        tipo.forEach(function(tipo) {
          listTipo.push(new Tipo(tipo));
        });
        onTipoLoaded(listTipo);
      }, this.handleError);
  }
  private handleError(error) {
    console.log(error);
  }
}
