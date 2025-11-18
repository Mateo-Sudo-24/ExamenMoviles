import { Injectable } from '@angular/core';
import { SupabaseService } from '../core/services/supabase';

export interface Mensaje {
  id: string;
  contratacion_id: string;
  sender_id: string; // Cambia a sender_id
  message: string; // Cambia a message
  timestamp: string;
  userId?: string;
  texto?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  constructor(private supabaseService: SupabaseService) {}

  async sendMessage(contratacionId: string, senderId: string, message: string): Promise<Mensaje> {
    try {
      const { data, error } = await this.supabaseService.getClient()
        .from('mensajes_chat')
        .insert([{ contratacion_id: contratacionId, sender_id: senderId, message }])
        .select()
        .single();
      if (error) throw error;
      return data;
    } catch (error) {
      throw error;
    }
  }

  async getMessages(contratacionId: string): Promise<Mensaje[]> {
    try {
      const { data, error } = await this.supabaseService.getClient()
        .from('mensajes_chat')
        .select('*')
        .eq('contratacion_id', contratacionId)
        .order('timestamp', { ascending: true });
      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error obteniendo mensajes:', error);
      return [];
    }
  }

  subscribeToMessages(contratacionId: string, callback: (payload: any) => void) {
    return this.supabaseService.getClient()
      .channel(`chat_${contratacionId}`)
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'mensajes_chat', filter: `contratacion_id=eq.${contratacionId}` }, callback)
      .subscribe();
  }

  async setTyping(contratacionId: string, userId: string, isTyping: boolean) {
    try {
      await this.supabaseService.getClient()
        .channel(`typing_${contratacionId}`)
        .send({ type: 'broadcast', event: 'typing', payload: { userId, isTyping } });
    } catch (error) {
      console.error('Error enviando typing:', error);
    }
  }
}