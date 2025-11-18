// splash.page.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../core/services/auth';

@Component({
  selector: 'app-splash',
  templateUrl: './splash.page.html',
  styleUrls: ['./splash.page.scss'],
  standalone: false
})
export class SplashPage implements OnInit {

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

 // splash.page.ts → pégalo tal cual
ngOnInit() {
  const user = this.authService.getCurrentUser();

  if (user) {
    // Si ya estás dentro de la app (chat, perfil, etc.) → NO hacemos nada
    if (this.router.url !== '/' && this.router.url !== '/splash') {
      return; // ¡Te deja tranquilo en el chat!
    }

    // Primera vez que abre la app → va al catálogo después del splash
    setTimeout(() => {
      this.router.navigate(['/catalogo'], { replaceUrl: true });
    }, 2000);
  } else {
    setTimeout(() => {
      this.router.navigate(['/login'], { replaceUrl: true });
    }, 2000);
  }
}
}