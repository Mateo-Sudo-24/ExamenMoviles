import { Injectable } from '@angular/core';
import { SupabaseService } from '../core/services/supabase';

export class Contratacion {
  id: string = '';
  user_id: string = '';
  plan_id: string = '';
  fecha: string = '';
  estado: string = '';
  plan?: any;

  constructor(data: Partial<Contratacion> = {}) {
    Object.assign(this, data);
  }

  get userName(): string {
    return this.plan?.perfiles?.email || 'Usuario';
  }

  get planName(): string {
    return this.plan?.nombre || 'Plan';
  }

  get planNombre(): string {
    return this.planName;
  }
}

@Injectable({
  providedIn: 'root'
})
export class ContratacionesService {
  constructor(private supabaseService: SupabaseService) {}

  private mapToContratacion(item: any): Contratacion {
    return new Contratacion({
      id: item.id,
      user_id: item.user_id,
      plan_id: item.plan_id,
      fecha: item.fecha,
      estado: item.estado,
      plan: item.planes_moviles || item.plan || undefined
    });
  }

  async contratarPlan(planId: string, userId: string): Promise<Contratacion> {
    try {
      const { data, error } = await this.supabaseService.getClient()
        .from('contrataciones')
        .insert([{ user_id: userId, plan_id: planId, estado: 'pendiente' }])
        .select()
        .single();
      if (error) throw error;
      return this.mapToContratacion(data);
    } catch (error) {
      throw error;
    }
  }

  async getUserContrataciones(userId: string): Promise<Contratacion[]> {
    try {
      const { data, error } = await this.supabaseService.getClient()
        .from('contrataciones')
        .select('*, planes_moviles(*)')
        .eq('user_id', userId);
      if (error) throw error;
      return (data || []).map((d: any) => this.mapToContratacion(d));
    } catch (error) {
      console.error('Error obteniendo contrataciones:', error);
      return [];
    }
  }

  async getContratacionesPendientes(): Promise<Contratacion[]> {
    try {
      const { data, error } = await this.supabaseService.getClient()
        .from('contrataciones')
        .select('*, planes_moviles(*), perfiles(*)')
        .eq('estado', 'pendiente');
      if (error) throw error;
      return (data || []).map((d: any) => this.mapToContratacion(d));
    } catch (error) {
      console.error('Error obteniendo contrataciones pendientes:', error);
      return [];
    }
  }

  async updateEstado(id: string, estado: string): Promise<void> {
    try {
      const { error } = await this.supabaseService.getClient()
        .from('contrataciones')
        .update({ estado })
        .eq('id', id);
      if (error) throw error;
    } catch (error) {
      throw error;
    }
  }
}
