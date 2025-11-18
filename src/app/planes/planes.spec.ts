import { TestBed } from '@angular/core/testing';
import { PlanesService } from './planes';
import { SupabaseService } from '../core/services/supabase';

describe('PlanesService', () => {
  let service: PlanesService;

  const mockSupabase: Partial<SupabaseService> = {
    getClient: () => ({
      from: () => ({
        select: () => ({ eq: () => ({}) }),
        insert: () => ({ select: () => ({ single: () => ({}) }) }),
        update: () => ({ select: () => ({ single: () => ({}) }) }),
        delete: () => ({})
      }),
      storage: {
        from: () => ({
          upload: async () => ({ data: null, error: null }),
          getPublicUrl: (name: string) => ({ data: { publicUrl: `https://cdn/${name}` } }),
          remove: async () => ({ data: null, error: null })
        })
      },
      channel: () => ({
        on: () => ({ subscribe: () => ({ unsubscribe: () => {}, remove: () => {} }) })
      })
    }) as any
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        PlanesService,
        { provide: SupabaseService, useValue: mockSupabase }
      ]
    });
    service = TestBed.inject(PlanesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});