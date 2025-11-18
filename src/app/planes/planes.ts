import { Injectable } from '@angular/core';
import { SupabaseService } from '../core/services/supabase';

export interface Plan {
  id: string;
  nombre: string;
  precio: number;
  segmento: string;
  publico_objetivo: string;
  datos_moviles: string;
  minutos_voz: string;
  sms: string;
  velocidad: string;
  redes_sociales: string;
  whatsapp: string;
  llamadas_internacionales: string;
  roaming: string;
  imagen_url: string;
  activo: boolean;
  // Propiedades derivadas para templates (calculadas por el consumidor)
  descripcion?: string;
  datos?: string;    // por ejemplo, "5" extraído de "5 GB"
  minutos?: string;  // por ejemplo, "100" extraído de "100 minutos"
  imagenUrl?: string; // alias en camelCase para imagen_url

  // Campo opcional de promoción que usa el template del dashboard
  promocion?: string;
}

@Injectable({
  providedIn: 'root'
})
export class PlanesService {
  constructor(private supabaseService: SupabaseService) {}

  async getPlanesActivos(): Promise<Plan[]> {
    try {
      const { data, error } = await this.supabaseService.getClient()
        .from('planes_moviles')
        .select('*')
        .eq('activo', true);
      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error obteniendo planes:', error);
      return [];
    }
  }

  async getAllPlanes(): Promise<Plan[]> {
    try {
      const { data, error } = await this.supabaseService.getClient()
        .from('planes_moviles')
        .select('*');
      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error obteniendo todos los planes:', error);
      return [];
    }
  }

  async createPlan(plan: Omit<Plan, 'id' | 'imagen_url'>, imageFile: File): Promise<Plan> {
    try {
      const imageUrl = await this.uploadImage(imageFile);
      const { data, error } = await this.supabaseService.getClient()
        .from('planes_moviles')
        .insert([{ ...plan, imagen_url: imageUrl }])
        .select()
        .single();
      if (error) throw error;
      return data;
    } catch (error) {
      throw error;
    }
  }

  async updatePlan(id: string, plan: Partial<Plan>, newImageFile?: File): Promise<Plan> {
    try {
      let imageUrl = plan.imagen_url;
      if (newImageFile) {
        await this.deleteImage(plan.imagen_url!);
        imageUrl = await this.uploadImage(newImageFile);
      }
      const { data, error } = await this.supabaseService.getClient()
        .from('planes_moviles')
        .update({ ...plan, imagen_url: imageUrl })
        .eq('id', id)
        .select()
        .single();
      if (error) throw error;
      return data;
    } catch (error) {
      throw error;
    }
  }

  async deletePlan(id: string): Promise<void> {
    try {
      const { error } = await this.supabaseService.getClient()
        .from('planes_moviles')
        .delete()
        .eq('id', id);
      if (error) throw error;
    } catch (error) {
      throw error;
    }
  }

  private async uploadImage(file: File): Promise<string> {
    try {
      const fileName = `${Date.now()}-${file.name}`;
      const { data, error } = await this.supabaseService.getClient()
        .storage
        .from('planes-imagenes')
        .upload(fileName, file, { upsert: false });
      if (error) throw error;
      return this.supabaseService.getClient().storage.from('planes-imagenes').getPublicUrl(fileName).data.publicUrl;
    } catch (error) {
      throw error;
    }
  }

  private async deleteImage(url: string): Promise<void> {
    try {
      const fileName = url.split('/').pop();
      const { error } = await this.supabaseService.getClient()
        .storage
        .from('planes-imagenes')
        .remove([fileName!]);
      if (error) throw error;
    } catch (error) {
      throw error;
    }
  }

  subscribeToPlanes(callback: (payload: any) => void) {
    return this.supabaseService.getClient()
      .channel('planes_changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'planes_moviles' }, callback)
      .subscribe();
  }
}