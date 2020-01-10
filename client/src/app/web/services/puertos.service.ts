import { AngularFireDatabase, AngularFireList } from 'angularfire2/database'

import { Injectable } from '@angular/core'
import { Puertos } from '../models/puertos'
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root',
})
export class PuertosService {
  puertosRef: AngularFireList<Puertos> = null
  puertos: any

  constructor(private db: AngularFireDatabase) {
    this.puertosRef = db.list('/puertos')
  }
  getpuertos(onpuertosLoaded) {
    this.puertosRef
      .snapshotChanges()
      .pipe(
        map(changes => changes.map(c => ({ key: c.payload.key, ...c.payload.val() })))
      )
      .subscribe(puertos => {
        const listPuertos = Array<Puertos>()
        puertos.forEach(function(puerto) {
          listPuertos.push(new Puertos(puerto))
        })
        onpuertosLoaded(listPuertos)
      }, this.handleError)
  }

  getPuerto(key: string, onLoaded) {
    return this.db
      .object(`puertos/${key}`)
      .snapshotChanges()
      .subscribe(data => onLoaded(data.payload.val()))
  }

  createPuerto(puerto: Puertos, onSaved): void {
    this.puertosRef.push(puerto).then(onSaved)
  }

  updatePuerto(key: string, value: any): void {
    this.puertosRef.update(key, value).catch(error => this.handleError(error))
  }

  deletePuerto(key: string): void {
    this.puertosRef.remove(key).catch(error => this.handleError(error))
  }

  private handleError(error) {
    console.log(error)
  }
}
