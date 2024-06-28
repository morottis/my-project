import { Component, OnInit } from '@angular/core';
import {
  FormArray,
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
import { Jsonvalue } from '../../interface/jsonvalue';
import { OrganizationState } from '../../service/organization-state.service';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { v4 as uuidv4 } from 'uuid';
import { Organization } from '../../object-data';

@Component({
  selector: 'app-thirdform',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
    CommonModule,
    SidebarComponent,
    RouterLink,
    RouterOutlet,
  ],
  templateUrl: './thirdform.component.html',
  styleUrl: './thirdform.component.css',
})
export class ThirdformComponent implements OnInit {
  arrayPermission: Jsonvalue | any;
  arrayNamePermission: Array<string> = [];
  sceltaCatalean: boolean = false;
  sceltaSmartCo: boolean = false;
  FormCheckboxPermissions: FormGroup;

  dbname: string = '';
  name: string = '';
  prefix: string = '';
  arrayPermissionValid: Jsonvalue | any = [];
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
    private integrationData: OrganizationState,
    private router: Router
  ) {
    this.FormCheckboxPermissions = this.fb.group({});

    this.integrationData.sharedData$.subscribe((data) => {
      this.sceltaCatalean = data;
    });

    this.integrationData.sharedDataSmartCo.subscribe((data) => {
      this.sceltaSmartCo = data;
    });

    this.integrationData.organization$.subscribe((data) => {
      this.organization = data;
    });
  }

  ngOnInit(): void {
    this.http
      .getPermission<Jsonvalue>(
        'https://user.datalean-nodejs-dev.catalean.com/permission',
        'e7285b6d-7eda-4e93-be32-e5bc9de0eacf'
      )
      .subscribe({
        next: (data: Jsonvalue) => {
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
          this.FormCheckboxPermissions.addControl(
            this.arrayNamePermission[i],
            this.fb.control(true, Validators.requiredTrue)
          );
        }
      }
      if (this.sceltaCatalean == true && this.sceltaSmartCo == null) {
        for (let y = 0; y < this.arrayPermissionsCatalean.length; y++) {
          if (this.arrayNamePermission[i] == this.arrayPermissionsCatalean[y]) {
            this.FormCheckboxPermissions.addControl(
              this.arrayNamePermission[i],
              this.fb.control(true, Validators.requiredTrue)
            );
          }
        }
        this.checked(i);
      } else if (this.sceltaSmartCo == true && this.sceltaCatalean == null) {
        for (let y = 0; y < this.arrayPermissionsSmartco.length; y++) {
          if (this.arrayNamePermission[i] == this.arrayPermissionsSmartco[y]) {
            this.FormCheckboxPermissions.addControl(
              this.arrayNamePermission[i],
              this.fb.control(true, Validators.requiredTrue)
            );
          }
        }
        this.checked(i);
      } else if (this.sceltaSmartCo == true && this.sceltaCatalean == true) {
        for (let y = 0; y < this.arrayPermissionsBoth.length; y++) {
          if (this.arrayNamePermission[i] == this.arrayPermissionsBoth[y]) {
            this.FormCheckboxPermissions.addControl(
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
    let UUID = this.creazioneUUID();
    let UUID_roles = this.creazioneUUIDRoles();

    console.log(this.arrayPermission); // sia uuid che altro
    this.takeCheckboxTrue();

    if (this.prefix) {
      this.http
        .post(
          'https://organization.datalean-nodejs-dev.catalean.com/organization',{uuid: UUID,name: this.name.trim(),prefix: this.prefix.trim(),dbName: this.dbname.trim(),}
        )
        .subscribe((data) => 
        {
          this.http
            .post('https://user.datalean-nodejs-dev.catalean.com/role',{name: this.name.trim() + '_add',permissions: this.arrayPermissionValid,uuid: UUID_roles,},UUID).subscribe((data) => {});
        });
      this.integrationData.datiUUID(UUID, UUID_roles);
      this.router.navigate(['/step4']);
    }
    this.credentialCheck = true;
  }

  checked(i: number) {
    this.FormCheckboxPermissions.addControl(
      this.arrayNamePermission[i],
      this.fb.control(false)
    );
  }

  creazioneUUID(): string {
    return uuidv4();
  }

  creazioneUUIDRoles(): string {
    return uuidv4();
  }

  takeCheckboxTrue() {
    this.arrayPermissionValid.splice(0, this.arrayPermissionValid.length); // ripulisco l'array
    for (let i = 0; i < this.arrayPermission.length; i++) {
      if (
        this.FormCheckboxPermissions.get(this.arrayPermission[i].name)?.value ==
        true
      ) {
        this.arrayPermissionValid.push(this.arrayPermission[i]);
      }
    }
  }
}
