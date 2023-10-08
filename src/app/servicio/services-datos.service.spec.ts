import { TestBed } from '@angular/core/testing';

import { ServicesDatosService } from './services-datos.service';

describe('ServicesDatosService', () => {
  let service: ServicesDatosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServicesDatosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
