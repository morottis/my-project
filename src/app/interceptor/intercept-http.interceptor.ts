import { HttpInterceptorFn } from '@angular/common/http';
import { randomUUID } from 'crypto';

export const interceptHttpInterceptor: HttpInterceptorFn = (req, next) => {
  //console.log('sgghsgfsg'); 
  let token2 = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IjQyMTBlM2Y0MGM5N2U1NzljZGU2YjIxNjFjNTZhYTEwODQ0ODgwZWUzYjc0OWY5NzAzNDY3M2Y2ZDk0ZTRhYTEifQ.eyJ1c2VybmFtZSI6IkZpbGlwcG8iLCJ1c2VyVHlwZSI6ImFkbWluIiwiZXhwIjoxNzIwMzExMTc4LCJpYXQiOjE3MTkzMDc1Nzh9.LhCENe6yDa6ZYAPqL9w6DgMrjlAHqRPUe4nFqEMsVWALyL0tzo-w-LYaL68Gb5O2r7QBWPqDBkDhZZziLyJqlceap5mdv5IrY4YHvxdz1XxIxwCA8iUUqQxo7f3CG6jZ8C-pds-C48yL6ouOVtpc74O4pTAY1HS6ypz6dtgxuN5kUrafdVPonEtB7z9c7nI9VztNKY62ATFC2Z6EBRc3ESNoIgHKZ0si_fy3XAgFjVGl6Cyg0j3ThzsjN2U_KBOaOiwnqvuRTbdGQWA4cjIeyQyhTxvttsUC643c8hzv8MiRpE6sICvLyBhp-ud9ApORAtoC8HjH_rsr3Gyh_ni49A'
  if ( req.url.includes('https://organization.datalean-nodejs-dev.catalean.com/organization') || req.method != 'POST') 
    {
      token2 = `eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IjQyMTBlM2Y0MGM5N2U1NzljZGU2YjIxNjFjNTZhYTEwODQ0ODgwZWUzYjc0OWY5NzAzNDY3M2Y2ZDk0ZTRhYTEifQ.eyJ1c2VyVHlwZSI6InVzZXIiLCJ1c2VybmFtZSI6ImFkbWluQGRhdGFsZWFuLmNvbSIsIm9yZ2FuaXphdGlvblVVSUQiOiJlNzI4NWI2ZC03ZWRhLTRlOTMtYmUzMi1lNWJjOWRlMGVhY2YiLCJpYXQiOjE3MTg2MTIwODUsImV4cCI6MTcxOTgyMTY4NX0.WjftOiL2JWuk2gH-wErhHqk3Dqx1dwD2wzbwd4n1BlfFDnxNhPGKE0fvpZb7jzfs4NgONOTWqpSK8hU2toyGc3UfdVI04h52xXXs67J7z9I3z_C0RS7eG-33749m4OgaEv1KGkcKDAaHo8HJM9_vYyKffmo-vd9orGiXblhZbPm2EIDIE_1VDBQNCGURKLJSBQ8XhMprRKruoDd8bvEn_wQo3nnF36krp6YV0uj54GSv7j1hkslrvy6kBjzoAPnbWpQftUIPDQ0T8WEaYd7vXVuqxh91E8YiI74kRBP4GxCHvGK-YT6ogg8EqTUqMuOEUjQJZOmMjv8XVWe17CRNyQ`; 
    }
  const clonato = req.clone({ // clono il messaggio da mandafre cosi lo posso inviare con l' aggiunta dell' id 
    setHeaders: {
      Authorization: token2, 
    },
  });
  return next(clonato);
};
