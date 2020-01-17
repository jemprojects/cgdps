import { RouterModule, Routes } from "@angular/router";

import { AuthGuard } from "../auth/auth-guard.service";
import { BuquesFormComponent } from "./components/buques/buques-form/buques-form.component";
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
        component: EntradasListComponent,
        canActivate: [AuthGuard]
      },
      {
        path: "cgpds/SolicitudGiro",
        component: EntradaComponent,
        canActivate: [AuthGuard]
      },
      {
        path: "cgpds/entradas",
        component: EntradasListComponent,
        canActivate: [AuthGuard]
      },
      {
        path: "cgpds/buques/edit/:id",
        component: BuquesFormComponent,
        canActivate: [AuthGuard]
      },
      {
        path: "cgpds/buques/add",
        component: BuquesFormComponent,
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
      }
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WebRoutingModule {}
