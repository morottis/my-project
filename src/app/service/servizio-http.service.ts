import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { environment } from '../../environment';

@Injectable({
  providedIn: 'root',
})
export class ServizioHttpService {
  constructor(private http: HttpClient) {}


  getEntities<T>(
    endpoint: string, //url
    organizationUUID?: undefined | string , 
    additionalParams?: Record<string,unknown> | undefined, //filtraggi
  ): Observable<T> {
    const requestUrlBuilder = new UrlBuilder(endpoint).withOrganizationUUID(organizationUUID)

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

  getEntity<T>(endpoint: string,   entityUUID: string, organizationUUID?: undefined | string , params?: Record<string,unknown>   ): Observable<T> {
    const lastCharSlash = endpoint.slice(-1) === '/';
    if (!lastCharSlash) endpoint += '/';

    let builder = new UrlBuilder(endpoint + entityUUID).withOrganizationUUID(organizationUUID)

    if (params) builder = builder.withAdditionalParameter(params);

    const requestUrl = builder.build();
    return this.http.get<T>(requestUrl);
  }

  createEntity<T = unknown>(
    endpoint: string,
    newEntity: unknown,
    organizationUUID?: undefined | string ,
    additionalParameter = {},
    entityIsFile = false,
    options?: Record<string, any>
  ): Observable<T> {
    const requestUrl = new UrlBuilder(endpoint)
      .withOrganizationUUID(organizationUUID)
      .withAdditionalParameter(additionalParameter)
      .build();
    return this.http.post<T>(requestUrl, newEntity, options);
  }

  updateEntity<T = unknown>(
    endpoint: string,
    updatedEntity: Record<string,unknown>,
    organizationUUID?: undefined | string ,
    additionalParams?: Record<string,unknown> | undefined
  ): Observable<T> {
    if (updatedEntity?.['uuid']) {
      const lastCharSlash = endpoint.slice(-1) === '/';
      if (!lastCharSlash) endpoint += '/';
      const urlBuilder = new UrlBuilder(endpoint + updatedEntity?.['uuid'])
        .withOrganizationUUID(organizationUUID)

      if (additionalParams) {
        urlBuilder.withAdditionalParameter(additionalParams);
      }

      const requestUrl = urlBuilder.build();
      return this.http.put<T>(requestUrl, updatedEntity);
    } else {
      return throwError(() => new Error('update failed'));
    }
  }

  deleteEntity<T = unknown>(endpoint: string , entityToDelete: Record<string,unknown>, organizationUUID?: undefined | string , key?: string): Observable<T> {
    if ((key && entityToDelete[key]) || entityToDelete?.['uuid']) {
      const lastCharSlash = endpoint.slice(-1) === '/';
      if (!lastCharSlash) endpoint += '/';
      const keValue = key ? entityToDelete[key] : entityToDelete?.['uuid'];
      const requestUrl = new UrlBuilder(endpoint + keValue)
        .withOrganizationUUID(organizationUUID)
        .withAdditionalParameter(entityToDelete)
        .build();
      return this.http.delete<T>(requestUrl);
    } else {
      return throwError(() => new Error('update failed'));
    }
  }

  deleteEntityByUUID<T = unknown>(endpoint: string ,  entityToDelete: Record<string,unknown>, organizationUUID?: undefined | string , key?: string): Observable<T> {
    if ((key && entityToDelete[key]) || entityToDelete?.['uuid']) {
      const lastCharSlash = endpoint.slice(-1) === '/';
      if (!lastCharSlash) endpoint += '/';
      const keValue = key ? entityToDelete[key] : entityToDelete?.['uuid'];
      const requestUrl = new UrlBuilder(`${endpoint}${keValue}`).withOrganizationUUID(organizationUUID).build();
      return this.http.delete<T>(requestUrl);
    } else {
      return throwError(() => new Error('delete failed'));
    }
  }

}
export class UrlBuilder {
    private _parts = '';
    private _additionalParameter?: Record<string , unknown>;

    constructor(protected requestUrl: string = '') {
    }

    withQueryParam(queryParam: string, value: string) {
        const concatenationCharacter = this.requestUrl.includes('?') ? '&' : '?';
        this.requestUrl += concatenationCharacter + queryParam + '=' + value;
        return this;
    }

    withOrganizationUUID(organizationUUID: string | undefined) {
      if(organizationUUID)
        {
          this.withQueryParam('organizationUUID', organizationUUID);
        }
        return this;
    }

    withStructureUUIDsFilter(structureUUIDs: string[]) {
        let structureUUIDsStringValue = '';
        structureUUIDs.forEach((structureUUID, index) => {
            structureUUIDsStringValue += structureUUID;
            if (index < structureUUIDs.length - 1) {
                structureUUIDsStringValue += ',';
            }
        });

        this.requestUrl += '&structureFieldUUID=' + structureUUIDsStringValue;
        return this;
    }




    withAdditionalParameter(parameter: Record<string , unknown>): UrlBuilder {
        this._additionalParameter = parameter;

        Object.keys(this._additionalParameter).forEach((value) => {
            this.requestUrl += '&' + value + '=' + encodeURIComponent(parameter[value] as string | number | boolean);
        });
        return this;
    }

    withSortClause(sortingField: string, sortingDirection: string) {
        this.requestUrl += '&sortBy=' + encodeURIComponent(sortingField + '#' + sortingDirection);
        return this;
    }

   

    withSortClauses(sortingClauses: Map<string, string>) {
        let appendString = '&sortBy=';
        if (sortingClauses.size > 0) {
            sortingClauses.forEach((sortingDirectionValue: string, sortingFieldKey: string) => {
                this.requestUrl += appendString + encodeURIComponent(sortingFieldKey + '#' + sortingDirectionValue);
                appendString = ',';
            });
        }

        return this;
    }

    build(): string {
        if (this._parts != undefined && this._parts != '') {
            const concatenationCharacter = this.requestUrl.includes('?') ? '&' : '?';
            this.requestUrl += concatenationCharacter + 'parts=' + this._parts;
        }
        return this.requestUrl;
    }
}