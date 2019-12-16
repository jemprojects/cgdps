import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavegationComponent } from './components/navegation/navegation.component';
import { EntradasFormComponent } from './components/entradas-form/entradas-form.component';
import { EntradasListComponent } from './components/entradas-list/entradas-list.component';

@NgModule({
  declarations: [
    AppComponent,
    NavegationComponent,
    EntradasFormComponent,
    EntradasListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
