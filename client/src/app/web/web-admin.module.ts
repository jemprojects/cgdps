import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { AngularFireAuthModule } from "angularfire2/auth";
import { AngularFireDatabaseModule } from "angularfire2/database";
import { AngularFireModule } from "angularfire2";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { BrowserModule } from "@angular/platform-browser";
import { BuqueDetailComponent } from "./components/buques/buque-detail/buque-detail.component";
import { BuquesFormComponent } from "./components/buques/buques-form/buques-form.component";
import { BuquesListComponent } from "./components/buques/buques-list/buques-list.component";
import { CommonModule } from "@angular/common";
import { ConsultasComponent } from './components/consultas/consultas.component';
import { EntradaComponent } from './components/entradas/entrada/entrada.component';
import { EntradasListComponent } from "./components/entradas/entradas-list/entradas-list.component";
import { FlexLayoutModule } from "@angular/flex-layout";
import { MatMenuModule } from "@angular/material";
import { NgModule } from "@angular/core";
import { WebAdminComponent } from "./web-admin.component";
import { WebAdminMaterialModule } from "./web-admin.material.module";
import { WebRoutingModule } from "./web-admin-routing.module";
import { environment } from "../../environments/environment";
import { AddBuqueComponent } from './components/add-buque/add-buque.component';
import { AddAgenciaComponent } from './components/add-agencia/add-agencia.component';
import { AddBuquesComponent } from './components/add-buques/add-buques.component';

@NgModule({
  declarations: [
    BuquesFormComponent,
    BuquesListComponent,
    EntradasListComponent,
    WebAdminComponent,
    BuqueDetailComponent,
    EntradaComponent,
    ConsultasComponent,
    AddBuqueComponent,
    AddAgenciaComponent,
    AddBuquesComponent
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
    MatMenuModule
  ]
})
export class WebModule {}
