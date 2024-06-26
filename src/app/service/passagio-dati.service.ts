import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PassagioDatiService {
  CataleanSubject = new BehaviorSubject<any>(null);
  sharedData$ = this.CataleanSubject.asObservable(); // emette i valori da sharedDataSubject

  SmartCoSubject = new BehaviorSubject<any>(null);
  sharedDataSmartCo = this.SmartCoSubject.asObservable();

  nomeOrganizationSubject = new BehaviorSubject<any>(null);
  sharedDataNome = this.nomeOrganizationSubject.asObservable();

  prefixOrganizationSubject = new BehaviorSubject<any>(null);
  sharedDataPrefix = this.prefixOrganizationSubject.asObservable();

  dbnameOrganizationSubject = new BehaviorSubject<any>(null);
  sharedDataDbname = this.dbnameOrganizationSubject.asObservable();

  UUIDSubject = new BehaviorSubject<any>(null);
  shareDataUUID = this.UUIDSubject.asObservable();

  UUIDRolesSubject = new BehaviorSubject<any>(null);
  shareDataUUIDRoles = this.UUIDRolesSubject.asObservable();

  constructor() {}

  modificoDatoCatalean(data: boolean) {
    this.CataleanSubject.next(data); // invia il dato ai subscriber di shareData
  }

  modificoDatoSmartco(data: boolean) {
    this.SmartCoSubject.next(data); // invia il dato ai subscriber di shareData
  }

  datiOrganizazione(data: any, data2: any, data3: any) {
    this.nomeOrganizationSubject.next(data);
    this.dbnameOrganizationSubject.next(data2);
    this.prefixOrganizationSubject.next(data3);
  }

  datiUUID(UUID: any, UUIDRoles: any) {
    this.UUIDSubject.next(UUID);
    this.UUIDRolesSubject.next(UUIDRoles);
  }
}
