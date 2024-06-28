import { Injectable } from '@angular/core';
import { BehaviorSubject, first, map, switchMap } from 'rxjs';
import { Organization } from '../object-data';
import { ServizioHttpService } from './servizio-http.service';
import { environment } from '../../environment';
import { BaseEntity } from '../interface/jsonvalue';

@Injectable({
  providedIn: 'root',
})
export class OrganizationState {
  private organizationSubject = new BehaviorSubject<Organization | undefined>(
    undefined
  );
  organization$ = this.organizationSubject.asObservable();

  organizationName$ = this.organization$.pipe(
    map((organization) => organization?.name)
  );
  organizationPrefix$ = this.organization$.pipe(
    map((organization) => organization?.prefix)
  );
  organizationdbName$ = this.organization$.pipe(
    map((organization) => organization?.dbname)
  );

  CataleanSubject = new BehaviorSubject<any>(null);
  sharedData$ = this.CataleanSubject.asObservable(); // emette i valori da sharedDataSubject

  SmartCoSubject = new BehaviorSubject<any>(null);
  sharedDataSmartCo = this.SmartCoSubject.asObservable();

  UUIDSubject = new BehaviorSubject<any>(null);
  shareDataUUID = this.UUIDSubject.asObservable();

  UUIDRolesSubject = new BehaviorSubject<any>(null);
  shareDataUUIDRoles = this.UUIDRolesSubject.asObservable();

  PermissionsSubject = new BehaviorSubject<any>(null);
  shareDataPermissions = this.PermissionsSubject.asObservable();

  nameOrganization: string | undefined = '';
  prefixOrganization: string | undefined = '';
  nameDbOrganization: string | undefined = '';
  organizationUUID: string | undefined = '';
  roleUUID: string | undefined = '';
  permissions: Array<BaseEntity> = [];

  constructor(private http: ServizioHttpService) {}

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

  modifyPermissions(arrayPermissions: Array<BaseEntity>) {
    this.PermissionsSubject.next(arrayPermissions);
  }

  sendData() {
    this.takeData();
    console.log(this.nameOrganization);

    if (
      this.nameOrganization &&
      this.prefixOrganization &&
      this.nameDbOrganization
    ) { console.log('if' , this.permissions)
    
      this.http
        .createEntity(environment.organizationUrl, {
          uuid: this.organizationUUID,
          name: this.nameOrganization,
          prefix: this.prefixOrganization,
          dbName: this.nameDbOrganization,
        })
        .pipe(
          first(),
          switchMap((e) => {
            console.log(e);
            return this.http.createEntity(
              environment.rolesUrl,
              {
                name: this.nameOrganization + '_add',
                permissions: this.permissions,
                uuid: this.roleUUID,
              },
              this.organizationUUID
            );
          })
        )
        .subscribe((data) => {
          console.log(data);
          /*(first(),switchMap((e) => { console.log (e); return this.primo_servizio.insert_valore_http<{ cont: number }>("http://localhost:3000/cont")}))*/
        });
    } else {
      console.log('nomi non presenti ');
    }
  }

  takeData() {
    this.organization$.subscribe((data) => {
      this.nameOrganization = data?.name.trim();
      this.prefixOrganization = data?.prefix.trim();
      this.nameDbOrganization = data?.dbname.trim();
      console.log(this.nameOrganization);
    });

    this.shareDataUUID.subscribe((data) => {
      this.organizationUUID = data;
      console.log(data);
    });

    this.shareDataPermissions.subscribe((data) => { this.permissions = data , console.log(data)}); 

    this.shareDataUUIDRoles.subscribe((data) => { this.roleUUID = data , console.log("ROLES  " , data)}); 
  }
}
