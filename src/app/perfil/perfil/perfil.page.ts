import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
  standalone : false
})
export class PerfilPage implements OnInit {
  user: any = null;
  role: string | null = null;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.user = this.authService.getCurrentUser();
    if (this.user) {
      this.loadRole();
    }
  }

  async loadRole() {
    this.role = await this.authService.getUserRole(this.user.id);
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}