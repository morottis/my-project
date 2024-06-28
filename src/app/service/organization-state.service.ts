import { Injectable } from '@angular/core';
import { BehaviorSubject, first, map, switchMap } from 'rxjs';
import { Organization } from '../object-data';
import { ServizioHttpService } from './servizio-http.service';
import { environment } from '../../environment';
import { BaseEntity } from '../interface/base-entity';
import { ConfigurationService } from './configuration.service';

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

  firstNameUserSubject = new BehaviorSubject<any>(null);
  sharefirstNameUser = this.firstNameUserSubject.asObservable();

  secondNameUserSubject = new BehaviorSubject<any>(null);
  shareDataSecondNameUser = this.secondNameUserSubject.asObservable();

  passwordUserSubject = new BehaviorSubject<any>(null);
  shareDataPasswordUser = this.passwordUserSubject.asObservable();

  emailUserSubject = new BehaviorSubject<any>(null);
  shareDataEmailUser = this.emailUserSubject.asObservable();

  lingueSelezionateSubject = new BehaviorSubject<any>(null);
  shareDataLingueSelezionate = this.lingueSelezionateSubject.asObservable();

  linguaDeafultSubject = new BehaviorSubject<any>(null);
  shareDatalinguaDeafult = this.linguaDeafultSubject.asObservable();

  nameOrganization: string | undefined = '';
  prefixOrganization: string | undefined = '';
  nameDbOrganization: string | undefined = '';
  organizationUUID: string | undefined = '';
  roleUUID: string | undefined = '';
  emailUser: string | undefined = '';
  firstNameUser: string | undefined = '';
  lastNameUser: string | undefined = '';
  passwordUser: string | undefined = '';
  linguaDefault: string | undefined = '';
  permissions: Array<BaseEntity> = [];
  arrayLingueSelezionate: Array<string> = [];

  constructor(
    private http: ServizioHttpService,
    private configuration: ConfigurationService
  ) {}

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

  modifyUserInformation(
    firstName: string,
    secondName: string,
    email: string,
    password: string
  ) {
    this.firstNameUserSubject.next(firstName);
    this.secondNameUserSubject.next(secondName);
    this.passwordUserSubject.next(password);
    this.emailUserSubject.next(email);
  }

  modifyLanguages(lingueSelezionate: Array<string>, linguaDefault: string) {
    this.lingueSelezionateSubject.next(lingueSelezionate);
    this.linguaDeafultSubject.next(linguaDefault);
  }

  sendData() {
    this.takeData();
    console.log(this.nameOrganization);

    if (
      this.nameOrganization &&
      this.prefixOrganization &&
      this.nameDbOrganization
    ) {
      console.log('if', this.permissions);

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
            return this.http
              .createEntity(
                environment.rolesUrl,
                {
                  name: this.nameOrganization + '_add',
                  permissions: this.permissions,
                  uuid: this.roleUUID,
                },
                this.organizationUUID
              )
              .pipe(
                first(),
                switchMap((e) => {
                  console.warn(e);
                  return this.http
                    .createEntity(
                      environment.usersUrl,
                      {
                        email: this.emailUser?.trim(),
                        password: this.passwordUser?.trim(),
                        firstName: this.firstNameUser?.trim(),
                        lastName: this.lastNameUser?.trim(),
                        username: this.emailUser,
                        roles: [{ uuid: this.roleUUID }],
                      },
                      this.organizationUUID
                    )
                    .pipe(
                      first(),
                      switchMap((e) => {
                        console.warn(e);
                        return this.configuration
                          .createConfig(
                            {
                              value: this.arrayLingueSelezionate,
                              sensitive: false,
                              key: 'activeLocales',
                              type: 'array',
                            },
                            this.organizationUUID
                          )
                          .pipe(
                            first(),
                            switchMap((e) => {
                              console.warn(e);
                              return this.configuration.createConfig(
                                {
                                  key: 'defaultLocale',
                                  type: 'string',
                                  sensitive: false,
                                  value: this.linguaDefault,
                                },
                                this.organizationUUID
                              );
                            })
                          );
                      })
                    );
                })
              );
          })
        )
        .subscribe((data) => {
          console.log(data);
        });
    } else {
      console.warn('nomi non presenti ');
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

    this.shareDataPermissions.subscribe((data) => {
      (this.permissions = data), console.log(data);
    });

    this.shareDataUUIDRoles.subscribe((data) => {
      (this.roleUUID = data), console.log('ROLES  ', data);
    });

    this.sharefirstNameUser.subscribe((data) => {
      (this.firstNameUser = data), console.log(' FIRST NAME USER  ', data);
    });

    this.shareDataSecondNameUser.subscribe((data) => {
      (this.lastNameUser = data), console.log(' LAST NAME USER ', data);
    });

    this.shareDataPasswordUser.subscribe((data) => {
      (this.passwordUser = data), console.log(' PASSWORD USER', data);
    });

    this.shareDataEmailUser.subscribe((data) => {
      (this.emailUser = data), console.log('email user ', data);
    });

    this.shareDataLingueSelezionate.subscribe((data) => {
      (this.arrayLingueSelezionate = data),
        console.log('lingue selezionate ', data);
    });

    this.shareDatalinguaDeafult.subscribe((data) => {
      (this.linguaDefault = data), console.log('lingua default ', data);
    });
  }
}
