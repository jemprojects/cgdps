import { RouterModule, Routes } from '@angular/router';

import { BuquesFormComponent } from './components/buques-form/buques-form.component';
import { BuquesListComponent } from './components/buques-list/buques-list.component';
import { EntradasFormComponent } from './components/entradas-form/entradas-form.component';
import { EntradasListComponent } from './components/entradas-list/entradas-list.component';
import { NgModule } from '@angular/core';
import { WebAdminComponent } from './web-admin.component';

const routes: Routes = [{
  path: '',
  component: WebAdminComponent,
  children: [
    { path: '', redirectTo: 'CGPDS', pathMatch: 'full' },
    {
      path: 'cgpds/buques',
      component: BuquesFormComponent,
      canActivate: [],
    },
    {
      path: 'cgpds/buques/add',
      component: BuquesFormComponent,
      canActivate: [],
    },
    {
      path: 'cgpds/buques/edit/:id',
      component: BuquesFormComponent,
      canActivate: [],
    },
    {
      path: 'cgpds/buques',
      component: BuquesListComponent,
      canActivate: [],
    },
    {
      path: 'cgpds/entradas',
      component: EntradasFormComponent,
      canActivate: [],
    },
    {
      path: 'cgpds/entradas/edit/:id',
      component: EntradasFormComponent,
      canActivate: [],
    },
    {
      path: 'cgpds/entradas/add',
      component: EntradasFormComponent,
      canActivate: [],
    },
]
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WebRoutingModule { }
