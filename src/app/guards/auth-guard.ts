import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { SupabaseService } from '../core/services/supabase'; // ajusta la ruta si es necesario

export const AuthGuard: CanActivateFn = async (route, state) => {
  const supabase = inject(SupabaseService).getClient();
  const router = inject(Router);

  try {
    // Esto es lo más rápido y fiable con lock: false
    const { data, error } = await supabase.auth.getSession();

    if (error) {
      console.warn('Error en getSession:', error);
      router.navigate(['/splash']);
      return false;
    }

    if (data.session) {
      // Usuario autenticado → permite entrar al chat
      return true;
    } else {
      // No hay sesión → va al splash
      router.navigate(['/splash']);
      return false;
    }
  } catch (err) {
    console.warn('Excepción en AuthGuard:', err);
    router.navigate(['/splash']);
    return false;
  }
};