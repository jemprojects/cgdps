import { FormsModule, ReactiveFormsModule } from '@angular/forms'

import { AppComponent } from './app.component'
import { AppRoutingModule } from './app-routing.module'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { BrowserModule } from '@angular/platform-browser'
import { CommonModule } from '@angular/common'
import { LoginComponent } from './components/users/login/login.component'
import { MatPseudoCheckboxModule } from '@angular/material/core'
import { MaterialModule } from './material.module'
import { NgModule } from '@angular/core'
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component'
import { WebModule } from './web/web-admin.module'
import { environment } from '../environments/environment'

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    LoginComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    MatPseudoCheckboxModule,
    BrowserAnimationsModule


  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
