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
import { PassagioDatiService } from '../../service/passagio-dati.service';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { v4 as uuidv4 } from 'uuid';

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
  string: string = '';
  sceltaCatalean: boolean = false;
  sceltaSmartCo: boolean = false;
  FormCheckbox: FormGroup;
  dbname: string = '';
  name: string = '';
  prefix: string = '';
  arrayPermissionValid: Jsonvalue | any = [];
  verifica : boolean = false ; 

  arrayPermessiDatelean: Array<string> = [
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
  arrayPermessiCatalean: Array<string> = [
    'EDIT_APPLICATION_USERS',
    'READ_PRODUCTS',
    'ADD_APPLICATION_USERS',
    'READ_INTEGRATIONS',
    'EDIT_INTEGRATIONS',
  ];
  arrayPermessiSmartco: Array<string> = [
    'ADD_APPLICATION_USERS',
    'READ_INTEGRATIONS',
    'EDIT_INTEGRATIONS',
    'READ_APPLICATION_USERS',
    'READ_COMMUNICATIONS',
    'READ_APPLICATION_GROUPS',
  ];
  arrayEntrambi: Array<string> = [
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
    private passaggioData: PassagioDatiService,
    private router: Router
  ) {
    this.FormCheckbox = this.fb.group({});

    this.passaggioData.sharedData$.subscribe((data) => {
      this.sceltaCatalean = data;
    });
    console.log(this.sceltaCatalean);
    this.passaggioData.sharedDataSmartCo.subscribe((data) => {
      this.sceltaSmartCo = data;
    });
    console.log('smartCO : ' + this.sceltaSmartCo);

    this.passaggioData.sharedDataNome.subscribe((data) => {
      console.log(data);
      this.name = data;
    });

    this.passaggioData.sharedDataPrefix.subscribe((data) => {
      console.log(data);
      this.prefix = data;
    });

    this.passaggioData.sharedDataDbname.subscribe((data) => {
      console.log(data);
      this.dbname = data;
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
          console.log(data);
          this.arrayPermission = data;
          for (let index = 0; index < this.arrayPermission.length; index++) {
            this.arrayNamePermission[index] = this.arrayPermission[index].name;
          }
          console.log(this.arrayNamePermission);
          this.addControls();
        },
      });
  }

  private addControls(): void {
    console.log(this.arrayNamePermission.length);

    for (let i = 0; i < this.arrayNamePermission.length; i++) {
      for (let y = 0; y < this.arrayPermessiDatelean.length; y++) {
        if (this.arrayNamePermission[i] == this.arrayPermessiDatelean[y]) {
          console.log('nel if');
          this.FormCheckbox.addControl(
            this.arrayNamePermission[i],
            this.fb.control(true, Validators.requiredTrue)
          );
        }
      }
      if (this.sceltaCatalean == true && this.sceltaSmartCo == null) {
        for (let y = 0; y < this.arrayPermessiCatalean.length; y++) {
          if (this.arrayNamePermission[i] == this.arrayPermessiCatalean[y]) {
            console.log('nel if catalean ');
            this.FormCheckbox.addControl(
              this.arrayNamePermission[i],
              this.fb.control(true, Validators.requiredTrue)
            );
          }
        }
        this.checked(i);
      } else if (this.sceltaSmartCo == true && this.sceltaCatalean == null) {
        for (let y = 0; y < this.arrayPermessiSmartco.length; y++) {
          if (this.arrayNamePermission[i] == this.arrayPermessiSmartco[y]) {
            console.log('nel if smartco ');
            this.FormCheckbox.addControl(
              this.arrayNamePermission[i],
              this.fb.control(true, Validators.requiredTrue)
            );
          }
        }
        this.checked(i);
      } else if (this.sceltaSmartCo == true && this.sceltaCatalean == true) {
        for (let y = 0; y < this.arrayEntrambi.length; y++) {
          if (this.arrayNamePermission[i] == this.arrayEntrambi[y]) {
            console.log('nel if entrambi');
            this.FormCheckbox.addControl(
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

  invio() {
    let UUID = this.creazioneUUID();
    console.log(UUID);
    let UUID_roles = this.creazioneUUIDRoles();
    console.log('roles uuid : ' + UUID_roles);

    console.log(this.arrayPermission); // sia uuid che altro
    this.verificaTrue();

    if (this.prefix) {
      console.log(this.FormCheckbox.value); // fallo poi con lo switch map
      this.http
        .post(
          'https://organization.datalean-nodejs-dev.catalean.com/organization',
          {
            uuid: UUID,
            name: this.name.trimEnd().trimStart(),
            prefix: this.prefix.trimEnd().trimStart(),
            dbName: this.dbname.trimEnd().trimStart(),
          }
        )
        .subscribe((data) => {
          console.log(data);
          this.http
            .post(
              'https://user.datalean-nodejs-dev.catalean.com/role',
              {
                name: this.name.trimEnd().trimStart() + '_add',
                permissions: this.arrayPermissionValid,
                uuid: UUID_roles,
              },
              UUID
            )
            .subscribe((data) => {
              console.log(data);
            });
        });
      this.passaggioData.datiUUID(UUID, UUID_roles);
      this.router.navigate(['/step4']);
    }
    this.verifica = true ; 
    
  }

  checked(i: number) {
    this.FormCheckbox.addControl(
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

  verificaTrue() {
    this.arrayPermissionValid.splice(0, this.arrayPermissionValid.length); // ripulisco l'array
    for (let i = 0; i < this.arrayPermission.length; i++) {
      if (this.FormCheckbox.get(this.arrayPermission[i].name)?.value == true) {
        this.arrayPermissionValid.push(this.arrayPermission[i]);
        console.log(this.arrayPermissionValid);
      }
    }
  }
}
