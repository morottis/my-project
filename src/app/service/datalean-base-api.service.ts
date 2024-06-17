/*import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { environment } from '../environment';
import { UrlBuilder } from '../app/url-builder';

@Injectable({
  providedIn: 'root',
})
export class DataleanBaseApiService {
  constructor(private http: HttpClient) {}

  getEntities<T>( // per l aprima richiesta 
    endpoint: string, //url
    additionalParams: Record<string,unknown> | undefined, //filtraggi
  ): Observable<T> {
    const requestUrlBuilder = new UrlBuilder(endpoint).withOrganizationUUID(""); // mettere stringa 

    if (additionalParams) {
      const key = Object.keys(additionalParams).find((k) => k.includes('ommunityUUID'));
      if (!!key) {
        const { communityEntityUUID, ...params } = additionalParams;
        additionalParams = params;
      }
      for (const filter of Object.keys(additionalParams)) {
        if (additionalParams[filter] !== undefined) {
          // console.log('adding filter for %s = %s', filter, additionalParams[filter]);
          requestUrlBuilder.withQueryParam(filter, additionalParams[filter] as string);
        }
      }
    }

    return this.http.get<T>(requestUrlBuilder.build());
  }

  getEntity<T>(endpoint: string, entityUUID: string, params?: Record<string,unknown>): Observable<T> {
    const lastCharSlash = endpoint.slice(-1) === '/';
    if (!lastCharSlash) endpoint += '/';

    let builder = new UrlBuilder(endpoint + entityUUID).withOrganizationUUID(" "); 

    if (params) builder = builder.withAdditionalParameter(params);

    const requestUrl = builder.build();
    return this.http.get<T>(requestUrl);
  }

  createEntity<T = unknown>(
    endpoint: string,
    newEntity: unknown,
    additionalParameter = {},
    entityIsFile = false,
    options?: Record<string, any>
  ): Observable<T> {
    const requestUrl = new UrlBuilder(endpoint)
     // .withOrganizationUUID(environment.organizationUUID)
      .withAdditionalParameter(additionalParameter)
      .build();
    return this.http.post<T>(requestUrl, newEntity, options);
  }

  updateEntity<T = unknown>(
    endpoint: string,
    updatedEntity: Record<string,unknown>,
    additionalParams?: Record<string,unknown> | undefined
  ): Observable<T> {
    if (updatedEntity?.['uuid']) {
      const lastCharSlash = endpoint.slice(-1) === '/';
      if (!lastCharSlash) endpoint += '/';
      const urlBuilder = new UrlBuilder(endpoint + updatedEntity?.['uuid'])
        //.withOrganizationUUID(environment.organizationUUID)

      if (additionalParams) {
        urlBuilder.withAdditionalParameter(additionalParams);
      }

      const requestUrl = urlBuilder.build();
      return this.http.put<T>(requestUrl, updatedEntity);
    } else {
      return throwError(() => new Error('update failed'));
    }
  }

  deleteEntity<T = unknown>(endpoint: string, entityToDelete: Record<string,unknown>, key?: string): Observable<T> {
    if ((key && entityToDelete[key]) || entityToDelete?.['uuid']) {
      const lastCharSlash = endpoint.slice(-1) === '/';
      if (!lastCharSlash) endpoint += '/';
      const keValue = key ? entityToDelete[key] : entityToDelete?.['uuid'];
      const requestUrl = new UrlBuilder(endpoint + keValue)
        //.withOrganizationUUID(environment.organizationUUID)
        .withAdditionalParameter(entityToDelete)
        .build();
      return this.http.delete<T>(requestUrl);
    } else {
      return throwError(() => new Error('update failed'));
    }
  }

  deleteEntityByUUID<T = unknown>(endpoint: string, entityToDelete: Record<string,unknown>, key?: string): Observable<T> {
    if ((key && entityToDelete[key]) || entityToDelete?.['uuid']) {
      const lastCharSlash = endpoint.slice(-1) === '/';
      if (!lastCharSlash) endpoint += '/';
      const keValue = key ? entityToDelete[key] : entityToDelete?.['uuid'];
      const requestUrl = new UrlBuilder(`${endpoint}${keValue}`).withOrganizationUUID(environment.organizationUUID).build();
      return this.http.delete<T>(requestUrl);
    } else {
      return throwError(() => new Error('delete failed'));
    }
  }
}*/

