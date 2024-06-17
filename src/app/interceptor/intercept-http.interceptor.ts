import { HttpInterceptorFn } from '@angular/common/http';

export const interceptHttpInterceptor: HttpInterceptorFn = (req, next) => {
  //console.log('sgghsgfsg'); 
  const clonato = req.clone({ // clono il messaggio da mandafre cosi lo posso inviare con l' aggiunta dell' id 
    setHeaders: {
      Authorization: `Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IjQyMTBlM2Y0MGM5N2U1NzljZGU2YjIxNjFjNTZhYTEwODQ0ODgwZWUzYjc0OWY5NzAzNDY3M2Y2ZDk0ZTRhYTEifQ.eyJ1c2VyVHlwZSI6InVzZXIiLCJ1c2VybmFtZSI6ImFkbWluQGRhdGFsZWFuLmNvbSIsIm9yZ2FuaXphdGlvblVVSUQiOiJlNzI4NWI2ZC03ZWRhLTRlOTMtYmUzMi1lNWJjOWRlMGVhY2YiLCJpYXQiOjE3MTg2MTIwODUsImV4cCI6MTcxOTgyMTY4NX0.WjftOiL2JWuk2gH-wErhHqk3Dqx1dwD2wzbwd4n1BlfFDnxNhPGKE0fvpZb7jzfs4NgONOTWqpSK8hU2toyGc3UfdVI04h52xXXs67J7z9I3z_C0RS7eG-33749m4OgaEv1KGkcKDAaHo8HJM9_vYyKffmo-vd9orGiXblhZbPm2EIDIE_1VDBQNCGURKLJSBQ8XhMprRKruoDd8bvEn_wQo3nnF36krp6YV0uj54GSv7j1hkslrvy6kBjzoAPnbWpQftUIPDQ0T8WEaYd7vXVuqxh91E8YiI74kRBP4GxCHvGK-YT6ogg8EqTUqMuOEUjQJZOmMjv8XVWe17CRNyQ`,  
    },
  });
  return next(clonato);
};
