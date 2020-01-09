import { FormsModule, ReactiveFormsModule } from '@angular/forms'

import { AngularFireAuthModule } from 'angularfire2/auth'
import { AngularFireModule } from 'angularfire2'
import { AppComponent } from './app.component'
import { AppRoutingModule } from './app-routing.module'
import { AuthGuard } from './auth/auth-guard.service'
import { AuthService } from './auth/auth.service'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { BrowserModule } from '@angular/platform-browser'
import { CommonModule } from '@angular/common'
import { FlexLayoutModule } from "@angular/flex-layout";

import { MatPseudoCheckboxModule } from '@angular/material/core'
import { MaterialModule } from './material.module'
import { NgModule } from '@angular/core'
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component'
import { WebModule } from './web/web-admin.module'
import { environment } from '../environments/environment'

@NgModule({
  declarations: [AppComponent,
   PageNotFoundComponent, 
   LoginComponent],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    MaterialModule,
    FormsModule,
    WebModule,
    ReactiveFormsModule,
    MatPseudoCheckboxModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule
  ],
  providers: [AuthService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule {}
