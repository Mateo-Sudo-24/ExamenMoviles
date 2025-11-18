import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ContratacionesService, Contratacion } from '../contrataciones';
import { AuthService } from '../../core/services/auth';

@Component({
  selector: 'app-mis-contrataciones',
  templateUrl: './mis-contrataciones.page.html',
  styleUrls: ['./mis-contrataciones.page.scss'],
  standalone : false
})
export class MisContratacionesPage implements OnInit {
  contrataciones: Contratacion[] = [];

  constructor(
    private contratacionesService: ContratacionesService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadContrataciones();
  }

  async loadContrataciones() {
    const userId = this.authService.getCurrentUser()?.id;
    if (userId) {
      this.contrataciones = await this.contratacionesService.getUserContrataciones(userId);
    }
  }

  openChat(contratacionId: string) {
    this.router.navigate(['/chat', contratacionId]);
  }
}