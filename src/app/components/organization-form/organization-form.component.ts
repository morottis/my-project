import { Component, OnDestroy } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { ServizioHttpService } from '../../service/servizio-http.service';
import { Organization } from '../../object-data';
import {
  ActivatedRoute,
  Router,
  RouterLink,
  RouterOutlet,
} from '@angular/router';
import { OrganizationState } from '../../service/organization-state.service';
import { environment } from '../../../environment';

@Component({
  selector: 'app-organization-form',
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
  providers: [],
  templateUrl: './organization-form.component.html',
  styleUrl: './organization-form.component.css',
})
export class OrganizationForm {
  

  verifica: boolean = true;

  scrittaErrore: string | undefined = '';

  constructor(
    private http: ServizioHttpService,
    private router: Router,
    private passagio_dati: OrganizationState
  ) {}

  formOrganization = new FormGroup({
    // form group
    name: new FormControl('', {  nonNullable : true  , validators: [Validators.required] }),
    prefix: new FormControl('', { nonNullable : true  , validators: [Validators.required] }),
    dbname: new FormControl('', { nonNullable : true , validators: [Validators.required] }),
  });

  onSubmit() {
   
    let prefix = this.formOrganization.value.prefix?.trim();
    let nomeDb = this.formOrganization.value.dbname?.trim();
    this.http
      .getEntities<Organization[]>(environment.organizationUrl)
      .subscribe({
        next: (data) => {
          const organizationList: Organization[] = data;
          let organizationAlreadyPresent = organizationList.some( organization => {
            if (prefix === organization.prefix) {
              console.warn(' prefisso gia presente ');
              this.scrittaErrore = 'prefisso errato';
              
              return true ; // se ritorno true la find si interrompe e prende il valore che ha causato il return true 
            }
            if (nomeDb === organization.dbname) {
              console.warn('nomedb gia presente ');
              this.scrittaErrore = 'nomedb errato ';
              
              return true ; 
            }
            return false ; 
          })
            if (!organizationAlreadyPresent) {// se non epresente nella lista invio i dati all observer 
              this.passagio_dati.setOrganization(
              {  
                name : this.formOrganization.getRawValue().name,// prende tutti i valori anche se sono disable 
                dbname :  this.formOrganization.getRawValue().dbname,
                prefix :  this.formOrganization.getRawValue().prefix
              }
              );
              this.scrittaErrore = undefined ; 
              this.router.navigate(['/step2']);
            }
          
        },
      });
  }
}
