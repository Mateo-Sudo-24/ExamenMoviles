import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CrearEditarPlanPage } from './crear-editar-plan.page';

const routes: Routes = [
  {
    path: '',
    component: CrearEditarPlanPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CrearEditarPlanPageRoutingModule {}
