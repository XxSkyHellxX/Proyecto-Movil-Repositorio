import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BuscarVehiculoPage } from './buscar-vehiculo.page';

describe('BuscarVehiculoPage', () => {
  let component: BuscarVehiculoPage;
  let fixture: ComponentFixture<BuscarVehiculoPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(BuscarVehiculoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
