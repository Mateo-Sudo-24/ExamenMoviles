import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetallePlanPage } from './detalle-plan.page';

const routes: Routes = [
  {
    path: '',
    component: DetallePlanPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetallePlanPageRoutingModule {}
