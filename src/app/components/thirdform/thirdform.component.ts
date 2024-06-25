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
import { v4 as uuidv4 } from 'uuid'


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
  array_permission: Jsonvalue | any;
  array_nomi_permission: Array<string> = [];
  string: string = '';
  scelta_catalean: boolean = false;
  scelta_smartCo: boolean = false;
  FormCheckbox: FormGroup;
  dbname : string = ''; 
  name : string = ''; 
  prefix : string = ''; 
  array_permission_valid :  Jsonvalue | any = [];  

  array_permessi_datelean: Array<string> = [
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
  array_permessi_catalean: Array<string> = [
    'EDIT_APPLICATION_USERS',
    'READ_PRODUCTS',
    'ADD_APPLICATION_USERS',
    'READ_INTEGRATIONS',
    'EDIT_INTEGRATIONS',
  ];
  array_permessi_smartco: Array<string> = [
    'ADD_APPLICATION_USERS',
    'READ_INTEGRATIONS',
    'EDIT_INTEGRATIONS',
    'READ_APPLICATION_USERS',
    'READ_COMMUNICATIONS',
    'READ_APPLICATION_GROUPS',
  ];
  array_entrambi: Array<string> = [
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
    private service: PassagioDatiService,
    private router: Router
  ) {
    this.FormCheckbox = this.fb.group({});

    this.service.sharedData$.subscribe((data) => {
      this.scelta_catalean = data;
    });
    console.log(this.scelta_catalean);
    this.service.sharedData_SmartCo.subscribe((data) => {
      this.scelta_smartCo = data;
    });
    console.log('smartCO : ' + this.scelta_smartCo);
    
    this.service.sharedData_nome.subscribe((data) => {
      console.log( data); 
      this.name = data ; 
    })

    this.service.sharedData_prefix.subscribe((data) => {
      console.log( data); 
      this.prefix = data ; 
    })

    this.service.sharedData_dbname.subscribe((data) => {
      console.log( data);
      this.dbname = data ;  
    })

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
          this.array_permission = data;
          for (let index = 0; index < this.array_permission.length; index++) {
            this.array_nomi_permission[index] =
              this.array_permission[index].name;
          }
          console.log(this.array_nomi_permission);
          this.addControls();
        },
      });
  }

  private addControls(): void {
    console.log(this.array_nomi_permission.length);

    for (let i = 0; i < this.array_nomi_permission.length; i++) {
      for (let y = 0; y < this.array_permessi_datelean.length; y++) {
        if (this.array_nomi_permission[i] == this.array_permessi_datelean[y]) {
          console.log('nel if');
          this.FormCheckbox.addControl(
            this.array_nomi_permission[i],
            this.fb.control(true, Validators.requiredTrue)
          );
        }
      }
      if (this.scelta_catalean == true && this.scelta_smartCo == null) {
        for (let y = 0; y < this.array_permessi_catalean.length; y++) {
          if (
            this.array_nomi_permission[i] == this.array_permessi_catalean[y]
          ) {
            console.log('nel if catalean ');
            this.FormCheckbox.addControl(
              this.array_nomi_permission[i],
              this.fb.control(true, Validators.requiredTrue)
            );
          }
        }
        this.checked(i); 
      } else if (this.scelta_smartCo == true && this.scelta_catalean == null) {
        for (let y = 0; y < this.array_permessi_smartco.length; y++) {
          if (this.array_nomi_permission[i] == this.array_permessi_smartco[y]) {
            console.log('nel if smartco ');
            this.FormCheckbox.addControl(
              this.array_nomi_permission[i],
              this.fb.control(true, Validators.requiredTrue)
            );
          }
        }
        this.checked(i); 
      } else if (this.scelta_smartCo == true && this.scelta_catalean == true) {
        for (let y = 0; y < this.array_entrambi.length; y++) {
          if (this.array_nomi_permission[i] == this.array_entrambi[y]) {
            console.log('nel if entrambi');
            this.FormCheckbox.addControl(
              this.array_nomi_permission[i],
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
    console.log( this.array_permission); // sia uuid che altro 
    this.verifica_true(); 

    console.log(this.FormCheckbox.value); // fallo poi con lo switch map 
    this.http.post('https://organization.datalean-nodejs-dev.catalean.com/organization' , { uuid : UUID ,  name : this.name , prefix :  this.prefix , dbName : this.dbname}).subscribe((data) => 
      {
        console.log(data); 
        this.http.post('https://user.datalean-nodejs-dev.catalean.com/role',  { name : this.name +  '_add' , permissions :  this.array_permission_valid   } ,  UUID ).subscribe((data) => 
          {
            console.log(data); 
          }
        )
      }
    )
    this.router.navigate(['/step4']); 
    
  }

  checked( i : number )
  {
      this.FormCheckbox.addControl(
      this.array_nomi_permission[i],
      this.fb.control(false)
    );
  }
  
  creazioneUUID() : string
  {
    return uuidv4()
  }

  verifica_true()
  {
    this.array_permission_valid.splice( 0 , this.array_permission_valid.length);// ripulisco l'array 
    for( let i = 0 ; i <this.array_permission.length ; i++ )
      {
        if( this.FormCheckbox.get(this.array_permission[i].name)?.value == true )
          {
            this.array_permission_valid.push(this.array_permission[i]);
            console.log(this.array_permission_valid);  
          }
      }
  }


}

