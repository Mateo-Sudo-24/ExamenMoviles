// ...existing code...
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { PlanesService, Plan } from '../planes';
import { AuthService } from '../../core/services/auth';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.page.html',
  styleUrls: ['./catalogo.page.scss'],
  standalone: false
})
export class CatalogoPage implements OnInit, OnDestroy {
  planes: Plan[] = [];
  loading = true;
  error: string | null = null;
  isAuthenticated = false;

  private authSubscription?: Subscription;

  constructor(
    private planesService: PlanesService,
    private authService: AuthService,
    private router: Router,
    private alertCtrl: AlertController
  ) {}

  ngOnInit() {
    this.loadPlanes();
    const authSvcAny = this.authService as any;
    const authObservable = authSvcAny.isAuthenticated$;
    if (authObservable && typeof authObservable.subscribe === 'function') {
      this.authSubscription = authObservable.subscribe(
        (isAuth: boolean) => this.isAuthenticated = isAuth
      );
    } else if (typeof authSvcAny.isAuthenticated === 'boolean') {
      // fallback: synchronous property
      this.isAuthenticated = authSvcAny.isAuthenticated;
    } else if (typeof authSvcAny.isAuthenticated === 'function') {
      // fallback: method that returns boolean | Promise<boolean>
      try {
        const result = authSvcAny.isAuthenticated();
        if (result && typeof result.then === 'function') {
          result.then((v: boolean) => this.isAuthenticated = v).catch(() => {});
        } else if (typeof result === 'boolean') {
          this.isAuthenticated = result;
        }
      } catch {
        // ignore errors from fallback method
      }
    }

    this.planesService.subscribeToPlanes(() => this.loadPlanes());
  }

  ngOnDestroy() {
    this.authSubscription?.unsubscribe();
  }

  async loadPlanes() {
    this.loading = true;
    this.error = null;
    try {
      this.planes = await this.planesService.getPlanesActivos();
    } catch (e: any) {
      console.error('Error cargando planes:', e);
      this.error = 'No se pudieron cargar los planes';
      this.planes = [];
    } finally {
      this.loading = false;
    }
  }

  viewPlan(planId: string) {
    this.router.navigate(['/detalle-plan', planId]);
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }

  async logout() {
    const alert = await this.alertCtrl.create({
      header: 'Cerrar Sesión',
      message: '¿Seguro que quieres salir?',
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Salir',
          handler: async () => {
            await this.authService.logout();
            this.router.navigate(['/login']);
          }
        }
      ]
    });
    await alert.present();
  }
}
