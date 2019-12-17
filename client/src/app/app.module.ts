import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { EntradasFormComponent } from './components/entradas-form/entradas-form.component';
import { EntradasListComponent } from './components/entradas-list/entradas-list.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import {MatMenuModule} from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MaterialModule } from './material.module';
import { NavegationComponent } from './components/navegation/navegation.component';
import { NgModule } from '@angular/core';

//https://github.com/FaztWeb/angular7-mysql-crud
//youtube.com/watch?v=lxYB79ANJM8
@NgModule({
  declarations: [
    AppComponent,
    NavegationComponent,
    EntradasFormComponent,
    EntradasListComponent,
  ],
  imports: [
    BrowserModule,
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
