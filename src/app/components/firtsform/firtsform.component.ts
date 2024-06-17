import { Component } from '@angular/core';
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
import { ObjectData } from '../../object-data';
import { log } from 'console';

@Component({
  selector: 'app-firtsform',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
    CommonModule,
    SidebarComponent,
  ],
  providers: [],
  templateUrl: './firtsform.component.html',
  styleUrl: './firtsform.component.css',
})
export class FirtsformComponent {
  array: ObjectData[] = [];
  nomeOrganizzazione: any = '';
  verifica: boolean = true;

  constructor(private http: ServizioHttpService) {}

  form_nome_organizazzione = new FormGroup({
    // form group
    nome: new FormControl('', { validators: [Validators.required] }),
    organizazzione: new FormControl('', { validators: [Validators.required] }),
  });

  Invio_dati() {
    this.nomeOrganizzazione = this.form_nome_organizazzione.value.nome?.trimEnd().trimStart();
    console.log(this.nomeOrganizzazione);
    this.form_nome_organizazzione.reset();
    this.http
      .prendo_valore<ObjectData[]>(
        'https://organization.datalean-nodejs-dev.catalean.com/organization'
      )
      .subscribe({
        next: (data) => {
          console.log(data);
          this.array = data;
          for (let i = 0; i < this.array.length; i++) {
            if (this.nomeOrganizzazione == this.array[i].name) {
              console.log(' nome giusto ');
              this.verifica = true;
              if ( this.verifica == true) 
              {
                break ; 
              }
            } else {
              console.log(' nome sbagliato ');
              this.verifica = false ; 
            }
          }
          //console.log( this.array[0].uuid);
        },
      });
  }
  
}
