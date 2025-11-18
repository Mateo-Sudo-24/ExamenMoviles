import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../core/services/auth'; // Importa el servicio de auth

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  async canActivate(): Promise<boolean> {
    const user = this.authService.getCurrentUser();
    if (!user) {
      this.router.navigate(['/login']); // Si no está logueado, redirige a login
      return false;
    }

    const role = await this.authService.getUserRole(user.id);
    if (role === 'asesor_comercial') {
      return true; // Es asesor, permite acceso
    } else {
      this.router.navigate(['/catalogo']); // No es asesor, redirige a catálogo público
      return false;
    }
  }
}