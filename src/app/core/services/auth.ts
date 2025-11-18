import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { SupabaseService } from './supabase';
import { AuthResponse, User } from '@supabase/supabase-js';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userSubject = new BehaviorSubject<User | null>(null);
  public user$ = this.userSubject.asObservable();

  constructor(private supabaseService: SupabaseService) {
    this.supabaseService.getClient().auth.onAuthStateChange((event, session) => {
      this.userSubject.next(session?.user || null);
    });
  }

  async register(email: string, password: string): Promise<AuthResponse> {
    try {
      const response = await this.supabaseService.getClient().auth.signUp({ email, password });
      if (response.data?.user) {
        await this.supabaseService.getClient().from('perfiles').insert([{ user_id: response.data.user.id, rol: 'usuario_registrado' }]);
      }
      return response;
    } catch (error) {
      throw error;
    }
  }

  async login(email: string, password: string): Promise<AuthResponse> {
    try {
      return await this.supabaseService.getClient().auth.signInWithPassword({ email, password });
    } catch (error) {
      throw error;
    }
  }

  async logout(): Promise<void> {
    try {
      await this.supabaseService.getClient().auth.signOut();
      this.userSubject.next(null);
    } catch (error) {
      throw error;
    }
  }

  getCurrentUser(): User | null {
    return this.userSubject.value;
  }

  async getUserRole(userId: string): Promise<string | null> {
    try {
      const { data, error } = await this.supabaseService.getClient()
        .from('perfiles')
        .select('rol')
        .eq('user_id', userId)
        .single();
      if (error) throw error;
      return data?.rol || null;
    } catch (error) {
      console.error('Error obteniendo rol:', error);
      return null;
    }
  }

  validateEmail(email: string): boolean {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }

  validatePassword(password: string): boolean {
    return password.length >= 6;
  }
}