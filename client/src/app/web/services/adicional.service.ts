import { AngularFireDatabase, AngularFireList } from "angularfire2/database";
import {
  Arboladura,
  Bandera,
  Empresa,
  Envase,
  Trafico
} from "../models/simpleData";

import { Giros } from "../models/giros";
import { Injectable } from "@angular/core";
import { Puerto } from "../models/puertos";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class AditionalService {
  banderasRef: AngularFireList<Bandera> = null;
  banderas: any;

  arboladurasRef: AngularFireList<Arboladura> = null;
  arboladuras: any;

  puertosRef: AngularFireList<Puerto> = null;
  puertos: any;

  girosRef: AngularFireList<Giros> = null;
  giros: any;

  traficosRef: AngularFireList<Trafico> = null;
  traficos: any;

  // tslint:disable-next-line: variable-name
  empresasCargDescRef: AngularFireList<Empresa> = null;
  empresasCargDesc: any;

  envasesRef: AngularFireList<Envase> = null;
  envases: any;

  constructor(private db: AngularFireDatabase) {
    this.banderasRef = db.list("/banderas");
    this.arboladurasRef = db.list("/arbuladuras");
    this.puertosRef = db.list("/puertos");
    this.girosRef = db.list("/giros");
    this.traficosRef = db.list("/traficos");
    this.empresasCargDescRef = db.list("/empresas_carga_descarga");
    this.envasesRef = db.list("/env_carga_descarga");
  }
  // service bandera
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

  // service Arboladura
  getArboladuras(onArboladuraLoaded) {
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
        onArboladuraLoaded(listArboladuras);
      }, this.handleError);
  }
  getArboladura(key: string, onLoaded) {
    return this.db
      .object(`arboladuras/${key}`)
      .snapshotChanges()
      .subscribe(data => onLoaded(data.payload.val()));
  }

  createArboladura(arboladura: Arboladura, onSaved): void {
    this.arboladurasRef.push(arboladura).then(onSaved);
  }

  updateArboladura(key: string, value: any): void {
    this.arboladurasRef
      .update(key, value)
      .catch(error => this.handleError(error));
  }

  deleteArboladura(key: string): void {
    this.arboladurasRef.remove(key).catch(error => this.handleError(error));
  }
  // service puertos
  getPuertos(onpuertosLoaded) {
    this.puertosRef
      .snapshotChanges()
      .pipe(
        map(changes =>
          changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
        )
      )
      .subscribe(puertos => {
        const listPuertos = Array<Puerto>();
        puertos.forEach(function(puerto) {
          listPuertos.push(new Puerto(puerto));
        });
        onpuertosLoaded(listPuertos);
      }, this.handleError);
  }

  getPuerto(key: string, onLoaded) {
    return this.db
      .object(`puertos/${key}`)
      .snapshotChanges()
      .subscribe(data => onLoaded(data.payload.val()));
  }

  createPuerto(puerto: Puerto, onSaved): void {
    this.puertosRef.push(puerto).then(onSaved);
  }

  updatePuerto(key: string, value: any): void {
    this.puertosRef.update(key, value).catch(error => this.handleError(error));
  }

  deletePuerto(key: string): void {
    this.puertosRef.remove(key).catch(error => this.handleError(error));
  }

  //service  giros
  getGiros(onGirosLoaded) {
    this.girosRef
      .snapshotChanges()
      .pipe(
        map(changes =>
          changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
        )
      )
      .subscribe(giros => {
        const listGiros = Array<Giros>();
        giros.forEach(function(giro) {
          listGiros.push(new Giros(giro));
        });
        onGirosLoaded(listGiros);
      }, this.handleError);
  }

  getGiro(key: string, onLoaded) {
    return this.db
      .object(`giros/${key}`)
      .snapshotChanges()
      .subscribe(data => onLoaded(data.payload.val()));
  }

  createGiro(giro: Giros, onSaved): void {
    this.girosRef.push(giro).then(onSaved);
  }

  updateGiro(key: string, value: any): void {
    this.girosRef.update(key, value).catch(error => this.handleError(error));
  }

  deleteGiro(key: string): void {
    this.girosRef.remove(key).catch(error => this.handleError(error));
  }
  // service traficos
  getTraficos(onTraficoLoaded) {
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
        onTraficoLoaded(listTraficos);
      }, this.handleError);
  }

  getTrafico(key: string, onLoaded) {
    return this.db
      .object(`traficos/${key}`)
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

  //Empresas
  getEmpresas(onTipoLoaded) {
    this.empresasCargDescRef
      .snapshotChanges()
      .pipe(
        map(changes =>
          changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
        )
      )
      .subscribe(empresas => {
        const listEmpresas = Array<Empresa>();
        empresas.forEach(function(empresa) {
          listEmpresas.push(new Empresa(empresa));
        });
        onTipoLoaded(listEmpresas);
      }, this.handleError);
  }
  //Envases
  getEnvases(onTipoLoaded) {
    this.envasesRef
      .snapshotChanges()
      .pipe(
        map(changes =>
          changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
        )
      )
      .subscribe(envases => {
        const listEnvases = Array<Envase>();
        envases.forEach(function(envase) {
          listEnvases.push(new Envase(envase));
        });
        onTipoLoaded(listEnvases);
      }, this.handleError);
  }
}
