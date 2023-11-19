import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModificarDatosPage } from './modificar-datos.page';

describe('ModificarDatosPage', () => {
  let component: ModificarDatosPage;
  let fixture: ComponentFixture<ModificarDatosPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ModificarDatosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
