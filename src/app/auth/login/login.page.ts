// src/app/auth/login/login.page.ts
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { AuthService } from '../../core/services/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false
})
export class LoginPage {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  async onLogin() {
    if (this.loginForm.valid) {
      const loading = await this.loadingCtrl.create({
        message: 'Iniciando sesión...',
        spinner: 'crescent'
      });
      await loading.present();

      try {
        const { email, password } = this.loginForm.value;
        await this.authService.login(email, password);
        
        // --- INICIO DE LA LÓGICA DE REDIRECCIÓN ---

        // 1. Obtener el usuario actual que acaba de iniciar sesión
        const currentUser = this.authService.getCurrentUser();
        if (!currentUser) {
          throw new Error('No se pudo obtener la sesión del usuario.');
        }

        // 2. Obtener el rol del usuario desde la tabla 'perfiles'
        const role = await this.authService.getUserRole(currentUser.id);

        await loading.dismiss();

        // 3. Redirección inteligente según el rol
        if (role === 'asesor_comercial') {
          this.router.navigate(['/dashboard']); // Redirige al panel de asesor
        } else {
          this.router.navigate(['/catalogo']);  // Redirige al catálogo para usuarios registrados
        }
        
        // --- FIN DE LA LÓGICA DE REDIRECCIÓN ---
        
      } catch (error: unknown) {
        await loading.dismiss();
        
        let message = 'Credenciales incorrectas o error de conexión.';
        if (error instanceof Error) {
          // Para no mostrar mensajes técnicos al usuario, podemos personalizarlo
          if (!error.message.toLowerCase().includes('invalid login credentials')) {
             message = error.message;
          }
        }
        
        const alert = await this.alertCtrl.create({
          header: 'Error en login',
          message: message,
          buttons: ['OK']
        });
        await alert.present();
      }
    } else {
      // Marcar todos los campos como touched para mostrar errores
      Object.keys(this.loginForm.controls).forEach(key => {
        this.loginForm.get(key)?.markAsTouched();
      });
    }
  }

  // ... (los métodos continueAsGuest y goToRegister se mantienen igual)
  
  async continueAsGuest() {
    this.router.navigate(['/catalogo']);
  }

  goToRegister() {
    this.router.navigate(['/register']);
  }
}