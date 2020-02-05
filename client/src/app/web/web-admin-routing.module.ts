import { RouterModule, Routes } from "@angular/router";

import { AddAgenciaComponent } from './components/Add/add-agencia/add-agencia.component';
import { AddBuqueComponent } from './components/Add/add-buque/add-buque.component';
import { AuthGuard } from "../auth/auth-guard.service";
import { BuquesListComponent } from "./components/buques/buques-list/buques-list.component";
import { ConsultasComponent } from './components/consultas/consultas.component';
import { EntradaComponent } from './components/entradas/entrada/entrada.component';
import { EntradasListComponent } from "./components/entradas/entradas-list/entradas-list.component";
import { NgModule } from "@angular/core";
import { WebAdminComponent } from "./web-admin.component";

const routes: Routes = [
  {
    path: "",
    component: WebAdminComponent,
    children: [
      {
        path: "",
        redirectTo: "cgpds",
        pathMatch: "full"
      },
      {
        path: "cgpds",
        component: EntradaComponent,
        canActivate: [AuthGuard]
      },
      {
        path: "cgpds/entradas",
        component: EntradasListComponent,
        canActivate: [AuthGuard]
      },
      {
        path: "cgpds/buques",
        component: BuquesListComponent,
        canActivate: [AuthGuard]
      },
      {
        path: "cgpds/consultas",
        component: ConsultasComponent,
        canActivate: [AuthGuard]
      },
      {
        path: "cgpds/AgregarAgencia/:id",
        component: AddAgenciaComponent,
        canActivate: [AuthGuard]
      },
      {
        path: "cgpds/AgregarBuque/:id",
        component: AddBuqueComponent,
        canActivate: [AuthGuard]
      },
      {
        path: "cgpds/EditarBuque/:id",
        component: AddBuqueComponent,
        canActivate: [AuthGuard]
      }
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WebRoutingModule {}
