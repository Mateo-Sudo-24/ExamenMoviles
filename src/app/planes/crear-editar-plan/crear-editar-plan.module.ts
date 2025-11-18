import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CrearEditarPlanPageRoutingModule } from './crear-editar-plan-routing.module';

import { CrearEditarPlanPage } from './crear-editar-plan.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CrearEditarPlanPageRoutingModule
  ],
  declarations: [CrearEditarPlanPage]
})
export class CrearEditarPlanPageModule {}
