import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListaContratacionesPage } from './lista-contrataciones.page';

describe('ListaContratacionesPage', () => {
  let component: ListaContratacionesPage;
  let fixture: ComponentFixture<ListaContratacionesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaContratacionesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
