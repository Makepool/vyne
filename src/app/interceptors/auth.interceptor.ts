import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const creds = btoa('user:userPass'); //obviously this would not be stored here in production

  const authReq = req.clone({
    setHeaders: {
      Authorization: `Basic ${creds}`,
    },
  });

  return next(authReq);
};
