import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { ServizioHttpService } from '../../service/servizio-http.service';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { BaseEntity } from '../../interface/base-entity';
import { OrganizationState } from '../../service/organization-state.service';
import { v4 as uuidv4 } from 'uuid';
import { Organization } from '../../object-data';
import { first } from 'rxjs';
import { environment } from '../../../environment';

@Component({
  selector: 'app-thirdform',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
    CommonModule,
    RouterLink,
    RouterOutlet,
  ],
  templateUrl: './permissions-form.component.html',
  styleUrl: './permissions-form.component.css',
})
export class PermissionsForm implements OnInit {
  arrayPermission: Array<BaseEntity> = []; // prendo i valori con la get
  arrayNamePermission: Array<string> = []; // prendo i nomi
  sceltaCatalean: boolean = false;
  sceltaSmartCo: boolean = false;
  formCheckboxPermissions: FormGroup;
  credentialCheck: boolean = false;
  organization: Organization | undefined;

  arrayPermissionsDatelean: Array<string> = [
    'READ_MEDIA_LIBRARY',
    'READ_FEATURES',
    'READ_STRUCTURE',
    'READ_DATALEAN_USERS',
    'EDIT_FEATURES',
    'CREATE_FEATURES',
    'READ_CONFIGURATION',
    'ASSIGN_ADMIN_ROLE',
    'CREATE_FEATURE_VALUES',
    'MANAGE_PERMISSION',
    'CREATE_CONFIGURATION',
    'READ_DASHBOARD',
  ];
  arrayPermissionsCatalean: Array<string> = [
    'EDIT_APPLICATION_USERS',
    'READ_PRODUCTS',
    'ADD_APPLICATION_USERS',
    'READ_INTEGRATIONS',
    'EDIT_INTEGRATIONS',
  ];
  arrayPermissionsSmartco: Array<string> = [
    'ADD_APPLICATION_USERS',
    'READ_INTEGRATIONS',
    'EDIT_INTEGRATIONS',
    'READ_APPLICATION_USERS',
    'READ_COMMUNICATIONS',
    'READ_APPLICATION_GROUPS',
  ];
  arrayPermissionsBoth: Array<string> = [
    'ADD_APPLICATION_USERS',
    'READ_INTEGRATIONS',
    'EDIT_INTEGRATIONS',
    'READ_APPLICATION_USERS',
    'READ_COMMUNICATIONS',
    'READ_APPLICATION_GROUPS',
    'EDIT_APPLICATION_USERS',
    'READ_PRODUCTS',
  ];

  constructor(
    private http: ServizioHttpService,
    private fb: FormBuilder,
    private submitData: OrganizationState,
    private router: Router
  ) {
    this.formCheckboxPermissions = this.fb.group({});

    this.submitData.sharedData$.pipe(first()).subscribe((data) => {
      this.sceltaCatalean = data;
    });

    this.submitData.sharedDataSmartCo.pipe(first()).subscribe((data) => {
      this.sceltaSmartCo = data;
    });
  }

  ngOnInit(): void {
    //console.log(this.organization);
    this.http
      .getEntities<Array<BaseEntity>>(
        environment.permissionUrl,
        'e7285b6d-7eda-4e93-be32-e5bc9de0eacf'
      )
      .subscribe({
        next: (data) => {
          // specifico con Jsonvalue che il valore e di tipo interfaccia jsonvalue
          this.arrayPermission = data;
          for (let index = 0; index < this.arrayPermission.length; index++) {
            this.arrayNamePermission[index] = this.arrayPermission[index].name;
          }
          this.addControls();
        },
      });
  }

  private addControls(): void {
    console.log(this.arrayNamePermission.length);

    for (let i = 0; i < this.arrayNamePermission.length; i++) {
      for (let y = 0; y < this.arrayPermissionsDatelean.length; y++) {
        if (this.arrayNamePermission[i] == this.arrayPermissionsDatelean[y]) {
          this.formCheckboxPermissions.addControl(
            this.arrayNamePermission[i],
            this.fb.control(true, Validators.requiredTrue)
          );
        }
      }
      if (this.sceltaCatalean == true && this.sceltaSmartCo == null) {
        for (let y = 0; y < this.arrayPermissionsCatalean.length; y++) {
          if (this.arrayNamePermission[i] == this.arrayPermissionsCatalean[y]) {
            this.formCheckboxPermissions.addControl(
              this.arrayNamePermission[i],
              this.fb.control(true, Validators.requiredTrue)
            );
          }
        }
        this.checked(i);
      } else if (this.sceltaSmartCo == true && this.sceltaCatalean == null) {
        for (let y = 0; y < this.arrayPermissionsSmartco.length; y++) {
          if (this.arrayNamePermission[i] == this.arrayPermissionsSmartco[y]) {
            this.formCheckboxPermissions.addControl(
              this.arrayNamePermission[i],
              this.fb.control(true, Validators.requiredTrue)
            );
          }
        }
        this.checked(i);
      } else if (this.sceltaSmartCo == true && this.sceltaCatalean == true) {
        for (let y = 0; y < this.arrayPermissionsBoth.length; y++) {
          if (this.arrayNamePermission[i] == this.arrayPermissionsBoth[y]) {
            this.formCheckboxPermissions.addControl(
              this.arrayNamePermission[i],
              this.fb.control(true, Validators.requiredTrue)
            );
          }
        }
        this.checked(i);
      } // viene fatto se non trova nulla e mi serve per inserire le chek vuote se non entrano nel primo for
      else {
        this.checked(i);
      }
    }
  }

  onSubmit() {
    let UUID = this.creationUUID();
    let UUID_roles = this.creationUUIDRoles();

    let checkedPermissions = this.takeCheckboxTrue(); // gestire l 'nvio
    console.log(checkedPermissions);
    this.submitData.modifyPermissions(checkedPermissions);
    this.submitData.datiUUID(UUID, UUID_roles);
    this.router.navigate(['/step4']);
  }

  checked(i: number) {
    this.formCheckboxPermissions.addControl(
      this.arrayNamePermission[i],
      this.fb.control(false)
    );
  }

  creationUUID(): string {
    return uuidv4();
  }

  creationUUIDRoles(): string {
    return uuidv4();
  }

  takeCheckboxTrue() {
    return this.arrayPermission.filter(
      (permission) =>
        this.formCheckboxPermissions.get(permission.name)?.value == true
    );
  }
}
