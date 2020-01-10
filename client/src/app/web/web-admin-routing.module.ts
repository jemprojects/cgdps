import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '../auth/auth-guard.service';
import { BuqueDetailComponent } from './components/buques/buque-detail/buque-detail.component';
import { BuquesFormComponent } from './components/buques/buques-form/buques-form.component';
import { BuquesListComponent } from './components/buques/buques-list/buques-list.component';
import { EntradasFormComponent } from './components/entradas/entradas-form/entradas-form.component';
import { EntradasListComponent } from './components/entradas/entradas-list/entradas-list.component';
import { NgModule } from '@angular/core';
import { WebAdminComponent } from './web-admin.component';

const routes: Routes = [
  {
    path: '',
    component: WebAdminComponent,
    children: [
      {
        path: '',
        redirectTo: 'cgpds',
        pathMatch: 'full'
      },
      {
        path: 'cgpds',
        component: EntradasFormComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'cgpds/entradas/edit/:id',
        component: EntradasFormComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'cgpds/entradas',
        component: EntradasFormComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'cgpds/buques/edit/:id',
        component: BuquesFormComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'cgpds/buques/add',
        component: BuquesFormComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'cgpds/buques',
        component: BuquesFormComponent,
        canActivate: [AuthGuard],
      },

    ],
  }];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WebRoutingModule { }
