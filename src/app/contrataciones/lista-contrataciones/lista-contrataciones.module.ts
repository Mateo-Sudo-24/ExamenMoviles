import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListaContratacionesPageRoutingModule } from './lista-contrataciones-routing.module';

import { ListaContratacionesPage } from './lista-contrataciones.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListaContratacionesPageRoutingModule
  ],
  declarations: [ListaContratacionesPage]
})
export class ListaContratacionesPageModule {}
