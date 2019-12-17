import { RouterModule, Routes } from '@angular/router'

import { BuquesFormComponent } from './components/buques-form/buques-form.component'
import { BuquesListComponent } from './components/buques-list/buques-list.component'
import { EntradasFormComponent } from './components/entradas-form/entradas-form.component'
import { EntradasListComponent } from './components/entradas-list/entradas-list.component'
import { NgModule } from '@angular/core'

const routes: Routes = [
  {
    path: 'entradas',
    component: EntradasListComponent,
  },
  {
    path: 'entradas/add',
    component: EntradasFormComponent,
  },
  {
    path: 'entradas/edit/:id',
    component: EntradasFormComponent,
  },
  {
    path: 'buques',
    component: BuquesListComponent,
  },
  {
    path: 'buques/add',
    component: BuquesFormComponent,
  },
  {
    path: 'buques/edit/:id',
    component: BuquesFormComponent,
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WebRoutingModule {}
