import { RouterModule, Routes } from '@angular/router';

import { EntradasFormComponent } from './components/entradas-form/entradas-form.component';
import { EntradasListComponent } from './components/entradas-list/entradas-list.component';
import { NgModule } from '@angular/core';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/entradas',
    pathMatch: 'full'
  },
  {
    path: 'entradas',
    component: EntradasListComponent
  },
  {
    path: 'entradas/add',
    component: EntradasFormComponent
  },
  {
    path: 'entradas/edit/:id',
    component: EntradasFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
