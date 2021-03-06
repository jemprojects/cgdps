import { RouterModule, Routes } from "@angular/router";

import { AddAgenciaComponent } from "./components/Add/add-agencia/add-agencia.component";
import { AddBuqueComponent } from "./components/Add/add-buque/add-buque.component";
import { AuthGuard } from "../auth/auth-guard.service";
import { BuquesListComponent } from "./components/buques/buques-list/buques-list.component";
import { ConsultasComponent } from "./components/consultas/consultas.component";
import { EditEntradaComponent } from './components/entradas/edit-entrada/edit-entrada.component';
import { EntradaComponent } from "./components/entradas/entrada/entrada.component";
import { EntradasListComponent } from "./components/entradas/entradas-list/entradas-list.component";
import { FormCargaComponent } from "./components/Formularios/form-carga/form-carga.component";
import { FormEntradaComponent } from './components/Formularios/form-entrada/form-entrada.component';
import { NgModule } from "@angular/core";
import { TableOperationsComponent } from './components/table-operations/table-operations.component';
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
        component: FormEntradaComponent,
        canActivate: [AuthGuard]
      },
      {
        path: "cgpds/entrada/:id",
        component: EditEntradaComponent,
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
        component: FormCargaComponent,
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
      },
      {
        path: "cgpds/operaciones",
        component: EntradaComponent,
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
