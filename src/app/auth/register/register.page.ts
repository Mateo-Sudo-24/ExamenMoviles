import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone : false
})
export class RegisterPage {
  registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    }, { validators: this.passwordMatchValidator });
  }

  passwordMatchValidator(group: FormGroup) {
    return group.get('password')?.value === group.get('confirmPassword')?.value ? null : { mismatch: true };
  }

  async onRegister() {
    if (this.registerForm.valid) {
      try {
        await this.authService.register(this.registerForm.value.email, this.registerForm.value.password);
        this.router.navigate(['/catalogo']);
      } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        alert('Error en registro: ' + message);
      }
    }
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }
}