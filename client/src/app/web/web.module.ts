import { FormsModule, ReactiveFormsModule } from '@angular/forms'

import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { BrowserModule } from '@angular/platform-browser'
import { BuquesFormComponent } from './components/buques-form/buques-form.component'
import { BuquesListComponent } from './components/buques-list/buques-list.component'
import { CommonModule } from '@angular/common'
import { EntradasFormComponent } from './components/entradas-form/entradas-form.component'
import { EntradasListComponent } from './components/entradas-list/entradas-list.component'
import { MaterialModule } from './web.material.module'
import { NavegatorProComponent } from './components/navegator-pro/navegator-pro.component'
import { NgModule } from '@angular/core'
import { WebComponent } from './web.component'
import { WebRoutingModule } from './web-routing.module'

@NgModule({
  declarations: [
    WebComponent,
    BuquesFormComponent,
    BuquesListComponent,
    EntradasFormComponent,
    EntradasListComponent,
    NavegatorProComponent,
  ],
  imports: [
    CommonModule,
    WebRoutingModule,
    MaterialModule,
    BrowserAnimationsModule,
    BrowserModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class WebModule {}
