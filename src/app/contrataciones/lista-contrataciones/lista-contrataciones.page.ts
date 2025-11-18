import { Component, OnInit } from '@angular/core';
import { ContratacionesService, Contratacion } from '../contrataciones';

@Component({
  selector: 'app-lista-contrataciones',
  templateUrl: './lista-contrataciones.page.html',
  styleUrls: ['./lista-contrataciones.page.scss'],
  standalone :false
})
export class ListaContratacionesPage implements OnInit {
  contrataciones: Contratacion[] = [];

  constructor(private contratacionesService: ContratacionesService) {}

  ngOnInit() {
    this.loadContrataciones();
  }

  async loadContrataciones() {
    this.contrataciones = await this.contratacionesService.getContratacionesPendientes();
  }

  async updateEstado(id: string, estado: string) {
    try {
      await this.contratacionesService.updateEstado(id, estado);
      this.loadContrataciones(); // Recarga lista
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : String(error);
      alert('Error: ' + message);
    }
  }
}