import { TestBed } from '@angular/core/testing';
import { CanDeactivateFn } from '@angular/router';

import { backwardGuard } from './backward.guard';

describe('backwardGuard', () => {
  const executeGuard: CanDeactivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => backwardGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
