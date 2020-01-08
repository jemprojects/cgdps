import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '../auth/auth-guard.service';
import { BuquesFormComponent } from './components/buques-form/buques-form.component';
import { BuquesListComponent } from './components/buques-list/buques-list.component';
import { EntradasFormComponent } from './components/entradas-form/entradas-form.component';
import { EntradasListComponent } from './components/entradas-list/entradas-list.component';
import { NgModule } from '@angular/core';
import { WebAdminComponent } from './web-admin.component';

const routes: Routes = [
  {
    path: '',
    component: WebAdminComponent,
    children: [
      { path: '', redirectTo: 'cgpds', pathMatch: 'full' },
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
        path: 'cgpds/buques',
        component: BuquesListComponent,
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
  },
]
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WebRoutingModule { }
