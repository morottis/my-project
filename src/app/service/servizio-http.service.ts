import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ServizioHttpService {
  constructor(private http: HttpClient) {}

  prendoValore<T>(url: string) {
    return this.http.get<T>(url);
  }

  getJson<T>() {
    return this.http.get<T>('assets/JSON.JSON');
  }

  getPermission<T>(url: string, UUID: string) {
    return this.http.get<T>(url, { params: { organizationUUID: UUID } });
  }

  post(url: string, data: any, UUID?: string) {
    let params = {};
    if (UUID) {
      params = { organizationUUID: UUID };
    }
    return this.http.post(url, data, { params });
  }
}
