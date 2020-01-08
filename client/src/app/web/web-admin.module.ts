import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFireModule } from "@angular/fire";
import { BuquesFormComponent } from './components/buques-form/buques-form.component';
import { BuquesListComponent } from './components/buques-list/buques-list.component';
import { CommonModule } from '@angular/common';
import { EntradasFormComponent } from './components/entradas-form/entradas-form.component';
import { EntradasListComponent } from './components/entradas-list/entradas-list.component';
import { FlexLayoutModule } from "@angular/flex-layout";
import { MatMenuModule } from '@angular/material'
import { MaterialModule } from './web-admin.material.module';
import { NavegatorComponent } from './components/navegator/navegator.component';
import { NgModule } from '@angular/core';
import { WebAdminComponent } from './web-admin.component';
import { WebRoutingModule } from './web-admin-routing.module';
import { environment } from '../../environments/environment'

@NgModule({
  declarations: [
    BuquesFormComponent,
    BuquesListComponent,
    EntradasFormComponent,
    EntradasListComponent,
    NavegatorComponent,
    WebAdminComponent
  ],
  imports: [
    CommonModule,
    WebRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireAuthModule,
    AngularFireModule.initializeApp(environment.firebase),
    MatMenuModule,
    FlexLayoutModule,
  ]
})
export class WebModule {}
