import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TiempoPage } from './tiempo.page';

describe('TiempoPage', () => {
  let component: TiempoPage;
  let fixture: ComponentFixture<TiempoPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(TiempoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
