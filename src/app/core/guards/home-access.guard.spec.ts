import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { homeAccessGuard } from './home-access.guard';

describe('homeAccessGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => homeAccessGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
