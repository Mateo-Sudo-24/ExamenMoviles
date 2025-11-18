// ...existing code...
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { PlanesService, Plan } from '../../planes/planes';
import { Contratacion, ContratacionesService } from '../../contrataciones/contrataciones';
import { SupabaseService } from '../../core/services/supabase';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
  standalone: false
})
export class DashboardPage implements OnInit, OnDestroy {
  planes: Plan[] = [];
  contrataciones: Contratacion[] = [];
  loadingPlanes = false;
  loadingContrataciones = false;
  error: string | null = null;

  private planesChannel: any = null;
  private contratacionesChannel: any = null;

  constructor(
    private planesService: PlanesService,
    private contratacionesService: ContratacionesService,
    private supabaseService: SupabaseService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadPlanes();
    this.loadContrataciones();

    // Suscribirse a cambios en planes y contrataciones para actualización en tiempo real
    try {
      this.planesChannel = this.supabaseService.subscribeToTable('planes_moviles', () => {
        this.loadPlanes();
      }, ['INSERT', 'UPDATE', 'DELETE']);
    } catch (err) {
      console.error('No se pudo subscribir a planes:', err);
    }

    try {
      this.contratacionesChannel = this.supabaseService.subscribeToTable('contrataciones', () => {
        this.loadContrataciones();
      }, ['INSERT', 'UPDATE', 'DELETE']);
    } catch (err) {
      console.error('No se pudo subscribir a contrataciones:', err);
    }
  }

  ngOnDestroy() {
    this.supabaseService.unsubscribeChannel(this.planesChannel);
    this.supabaseService.unsubscribeChannel(this.contratacionesChannel);
  }

  async loadPlanes() {
    this.loadingPlanes = true;
    try {
      this.planes = await this.planesService.getAllPlanes();
    } catch (err) {
      console.error('Error cargando planes:', err);
      this.error = 'No se pudieron cargar los planes.';
      this.planes = [];
    } finally {
      this.loadingPlanes = false;
    }
  }

  async loadContrataciones() {
    this.loadingContrataciones = true;
    try {
      this.contrataciones = await this.contratacionesService.getContratacionesPendientes();
    } catch (err) {
      console.error('Error cargando contrataciones:', err);
      this.contrataciones = [];
    } finally {
      this.loadingContrataciones = false;
    }
  }

  editPlan(planId: string) {
    this.router.navigate(['/crear-editar-plan', planId]);
  }

  createPlan() {
    this.router.navigate(['/crear-editar-plan']);
  }

  async deletePlan(planId: string) {
    if (!confirm('¿Eliminar plan?')) return;
    try {
      await this.planesService.deletePlan(planId);
      await this.loadPlanes();
    } catch (err) {
      console.error('Error eliminando plan:', err);
      alert('Error eliminando plan');
    }
  }

  // Contrataciones: aceptar / rechazar
  async acceptContratacion(id: string) {
    if (!confirm('¿Aceptar esta contratación?')) return;
    try {
      await this.contratacionesService.updateEstado(id, 'aceptado');
      await this.loadContrataciones();
      await this.loadPlanes(); // si el flujo cambia stock/estado del plan
    } catch (err) {
      console.error('Error aceptando contratación:', err);
      alert('No se pudo aceptar la contratación.');
    }
  }

  async rejectContratacion(id: string) {
    if (!confirm('¿Rechazar esta contratación?')) return;
    try {
      await this.contratacionesService.updateEstado(id, 'rechazado');
      await this.loadContrataciones();
    } catch (err) {
      console.error('Error rechazando contratación:', err);
      alert('No se pudo rechazar la contratación.');
    }
  }

  // Abrir chat para atender la consulta asociada a la contratación
  openChat(contratacionId: string) {
    this.router.navigate(['/chat', contratacionId]);
  }

  // Cerrar sesión del asesor y navegar a /login
  async logout() {
    const ok = confirm('¿Deseas cerrar sesión?');
    if (!ok) return;
    try {
      // signOut en supabase v2
      await this.supabaseService.getClient().auth.signOut();
    } catch (err) {
      console.error('Error cerrando sesión:', err);
    } finally {
      this.router.navigate(['/login']);
    }
  }
}
// ...existing code...