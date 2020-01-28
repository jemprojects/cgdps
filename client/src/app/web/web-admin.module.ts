import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { AddAgenciaComponent } from './components/add-agencia/add-agencia.component';
import { AddBuqueComponent } from './components/buques/add-buque/add-buque.component';
import { AngularFireAuthModule } from "angularfire2/auth";
import { AngularFireDatabaseModule } from "angularfire2/database";
import { AngularFireModule } from "angularfire2";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { BrowserModule } from "@angular/platform-browser";
import { BuquesListComponent } from './components/buques/buques-list/buques-list.component';
import { CommonModule } from "@angular/common";
import { ConsultasComponent } from './components/consultas/consultas.component';
import { EntradaComponent } from './components/entradas/entrada/entrada.component';
import { EntradasListComponent } from "./components/entradas/entradas-list/entradas-list.component";
import { FlexLayoutModule } from "@angular/flex-layout";
import { FormCargaComponent } from './components/form-carga/form-carga.component';
import { FormDescargaComponent } from './components/form-descarga/form-descarga.component';
import { FormEntradaComponent } from './components/entradas/form-entrada/form-entrada.component';
import { MatMenuModule } from "@angular/material";
import { NgModule } from "@angular/core";
import { OperacionesComponent } from './components/operaciones/operaciones.component';
import { SubFormBuqueComponent } from './components/sub-form-buque/sub-form-buque.component';
import { WebAdminComponent } from "./web-admin.component";
import { WebAdminMaterialModule } from "./web-admin.material.module";
import { WebRoutingModule } from "./web-admin-routing.module";
import { environment } from "../../environments/environment";

@NgModule({
  declarations: [
    EntradasListComponent,
    WebAdminComponent,
    EntradaComponent,
    ConsultasComponent,
    AddBuqueComponent,
    AddAgenciaComponent,
    OperacionesComponent,
    BuquesListComponent,
    FormEntradaComponent,
    FormCargaComponent,
    FormDescargaComponent,
    SubFormBuqueComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    CommonModule,
    WebRoutingModule,
    WebAdminMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    FlexLayoutModule,
    MatMenuModule,

  ]
})
export class WebModule {}
