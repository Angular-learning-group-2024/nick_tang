import { inject } from '@angular/core';
import { ActivatedRoute, CanActivateFn, Router } from '@angular/router';
import { AuthService } from './AuthService.service';

export const authGuard: CanActivateFn = (route, state) => {
  const isLoggedIn = inject(AuthService).isLoggedIn();
  if (isLoggedIn) {
    return true;
  }
  inject(Router).navigate(['/']);
  return false;
};
