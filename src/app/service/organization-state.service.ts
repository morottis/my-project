import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { Organization } from '../object-data';

@Injectable({
  providedIn: 'root',
})
export class OrganizationState {
  private organizationSubject = new BehaviorSubject<Organization | undefined>( undefined)
  organization$ = this.organizationSubject.asObservable(); 

  organizationName$ = this.organization$.pipe( map ( organization => organization?.name))
  organizationPrefix$ = this.organization$.pipe( map ( organization => organization?.prefix))
  organizationdbName$ = this.organization$.pipe( map ( organization => organization?.dbname))

  
  CataleanSubject = new BehaviorSubject<any>(null);
  sharedData$ = this.CataleanSubject.asObservable(); // emette i valori da sharedDataSubject

  SmartCoSubject = new BehaviorSubject<any>(null);
  sharedDataSmartCo = this.SmartCoSubject.asObservable();

  UUIDSubject = new BehaviorSubject<any>(null);
  shareDataUUID = this.UUIDSubject.asObservable();

  UUIDRolesSubject = new BehaviorSubject<any>(null);
  shareDataUUIDRoles = this.UUIDRolesSubject.asObservable();

  constructor() {}

  modifyCataleanData(data: boolean) {
    this.CataleanSubject.next(data); // invia il dato ai subscriber di shareData
  }

  modifySmartcoData(data: boolean) {
    this.SmartCoSubject.next(data); // invia il dato ai subscriber di shareData
  }

  setOrganization(data: Organization) {
    this.organizationSubject.next(data);

  }

  datiUUID(UUID: any, UUIDRoles: any) {
    this.UUIDSubject.next(UUID);
    this.UUIDRolesSubject.next(UUIDRoles);
  }
}
