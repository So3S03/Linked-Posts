import { isPlatformBrowser } from '@angular/common';
import { HttpInterceptorFn } from '@angular/common/http';
import { inject, PLATFORM_ID } from '@angular/core';

export const headerInterceptor: HttpInterceptorFn = (req, next) => {
  const PlatformId = inject(PLATFORM_ID);
  if(isPlatformBrowser(PlatformId))
  {
    if(localStorage.getItem("socialToken") !== null)
    {
      req = req.clone({
        setHeaders: {
          token: localStorage.getItem("socialToken") !
        }
      });
    }
  }
  return next(req);
};
