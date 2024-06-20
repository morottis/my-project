import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ServizioHttpService {
 
  constructor(private http : HttpClient) { }

  prendo_valore<T>(url : string )
  {
    return this.http.get<T>(url); 
  }
  getJson<T>()
  {
    return this.http.get<T>('assets/JSON.JSON'); 
  }  

}
