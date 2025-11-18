import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListaContratacionesPage } from './lista-contrataciones.page';

const routes: Routes = [
  {
    path: '',
    component: ListaContratacionesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListaContratacionesPageRoutingModule {}
