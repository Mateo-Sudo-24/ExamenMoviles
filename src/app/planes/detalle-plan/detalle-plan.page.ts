import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PlanesService, Plan } from '../planes';
import { ContratacionesService } from '../../contrataciones/contrataciones';
import { AuthService } from '../../core/services/auth';

@Component({
  selector: 'app-detalle-plan',
  templateUrl: './detalle-plan.page.html',
  styleUrls: ['./detalle-plan.page.scss'],
  standalone :false
})
export class DetallePlanPage implements OnInit {
  plan: Plan | null = null;
  isLoggedIn = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private planesService: PlanesService,
    private contratacionesService: ContratacionesService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    const planId = this.route.snapshot.paramMap.get('id');
    if (planId) {
      this.loadPlan(planId);
    }
    this.isLoggedIn = !!this.authService.getCurrentUser();
  }

  async loadPlan(id: string) {
    const planes = await this.planesService.getPlanesActivos();
    this.plan = planes.find(p => p.id === id) || null;
  }

  async contratar() {
    if (this.plan && this.isLoggedIn) {
      try {
        await this.contratacionesService.contratarPlan(this.plan.id, this.authService.getCurrentUser()!.id);
        alert('Contratación solicitada');
        this.router.navigate(['/mis-contrataciones']);
      } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        alert('Error: ' + message);
      }
    }
  }
}