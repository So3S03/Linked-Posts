import { isPlatformBrowser } from '@angular/common';
import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const homeAccessGuard: CanActivateFn = (route, state) => {
  const _PLATFORM_ID = inject(PLATFORM_ID);
  const _Router: Router = inject(Router);
  if(isPlatformBrowser(_PLATFORM_ID))
  {
    let token = localStorage.getItem("socialToken");
    if(token !== null)
    {
      return true;
    }
  }
  _Router.navigate(["/SignIn"]);
  return false;
};
