import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgxMatDatetimePickerModule, NgxMatTimepickerModule } from 'ngx-mat-datetime-picker';

import { AddAgenciaComponent } from './components/Add/add-agencia/add-agencia.component';
import { AddBuqueComponent } from './components/Add/add-buque/add-buque.component';
import { AngularFireAuthModule } from "angularfire2/auth";
import { AngularFireDatabaseModule } from "angularfire2/database";
import { AngularFireModule } from "angularfire2";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { BrowserModule } from "@angular/platform-browser";
import { BuquesListComponent } from './components/buques/buques-list/buques-list.component';
import { CommonModule } from "@angular/common";
import { ConsultasComponent } from './components/consultas/consultas.component';
import { DialogAddABComponent } from './components/popUp/dialog-add-ab/dialog-add-ab.component';
import { DialogAddPGComponent } from './components/popUp/dialog-add-pg/dialog-add-pg.component';
import { DialogBoxComponent } from './components/popUp/dialog-box/dialog-box.component';
import { DialogComponent } from './components/popUp/dialog/dialog.component';
import { EntradaComponent } from './components/entradas/entrada/entrada.component';
import { EntradasListComponent } from "./components/entradas/entradas-list/entradas-list.component";
import { FlexLayoutModule } from "@angular/flex-layout";
import { FormCargaComponent } from './components/Formularios/form-carga/form-carga.component';
import { FormEntradaComponent } from './components/Formularios/form-entrada/form-entrada.component';
import { MatMenuModule } from "@angular/material";
import { NgModule } from "@angular/core";
import { ServiciosPortuariosComponent } from './components/servicios-portuarios/servicios-portuarios.component';
import { TableOperationsComponent } from './components/table-operations/table-operations.component';
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
    BuquesListComponent,
    FormCargaComponent,
    FormEntradaComponent,
    DialogBoxComponent,
    DialogComponent,
    ServiciosPortuariosComponent,
    DialogAddPGComponent,
    DialogAddABComponent,
    TableOperationsComponent,


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
    NgxMatDatetimePickerModule,
    NgxMatTimepickerModule,
  ],
  entryComponents: [
    DialogAddPGComponent,
    DialogComponent,
    DialogBoxComponent
  ],
})
export class WebModule {}
