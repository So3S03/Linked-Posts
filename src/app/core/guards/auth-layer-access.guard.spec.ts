import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { authLayerAccessGuard } from './auth-layer-access.guard';

describe('authLayerAccessGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => authLayerAccessGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
