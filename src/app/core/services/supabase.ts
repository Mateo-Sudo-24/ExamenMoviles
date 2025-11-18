// ...existing code...
import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SupabaseService {
  private supabase: SupabaseClient;

  constructor() {
    const url = environment.supabaseUrl ;
    const key = environment.supabaseKey ;
    this.supabase = createClient(url, key);
  }

  getClient(): SupabaseClient {
    return this.supabase;
  }

  // Generic table helpers
  from(table: string) {
    return this.supabase.from(table);
  }

  async insert(table: string, rows: any) {
    return await this.supabase.from(table).insert(rows).select();
  }

  async update(table: string, eqField: string, eqValue: any, payload: any) {
    return await this.supabase.from(table).update(payload).eq(eqField, eqValue).select();
  }

  async remove(table: string, eqField: string, eqValue: any) {
    return await this.supabase.from(table).delete().eq(eqField, eqValue);
  }

  // Storage helpers
  async uploadFile(bucket: string, filePath: string, file: File, opts: any = {}) {
    return await this.supabase.storage.from(bucket).upload(filePath, file, opts);
  }

  getPublicUrl(bucket: string, path: string) {
    return this.supabase.storage.from(bucket).getPublicUrl(path);
  }

  async removeFiles(bucket: string, paths: string[]) {
    return await this.supabase.storage.from(bucket).remove(paths);
  }

  // Real-time helpers: returns channel/subscription
  subscribeToTable(table: string, callback: (payload: any) => void, events: string[] = ['INSERT', 'UPDATE', 'DELETE']) {
    const channel = this.supabase.channel(`${table}_changes`);
    // subscribe to postgres_changes for all provided events
    const eventStr = events.length === 1 ? events[0] : '*';
    return (channel as any)
      .on('postgres_changes', { event: eventStr, schema: 'public', table }, (payload: any) => {
        try { callback(payload); } catch (e) { console.error(e); }
      })
      .subscribe();
  }

  // convenience: unsubscribe/remove safe
  unsubscribeChannel(channel: any) {
    try {
      channel?.unsubscribe?.();
      channel?.remove?.();
    } catch {
      // noop
    }
  }
}
// ...existing code...