import { Component, OnDestroy } from '@angular/core';
import {FormControl,FormGroup,ReactiveFormsModule,Validators} from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { ServizioHttpService } from '../../service/servizio-http.service';
import { ObjectData } from '../../object-data';
import { ActivatedRoute, Router, RouterLink, RouterOutlet } from '@angular/router';


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
    RouterLink,
    RouterOutlet
  ],
  providers: [],
  templateUrl: './firtsform.component.html',
  styleUrl: './firtsform.component.css',
})


export class FirtsformComponent {
  array: ObjectData[] = [];
  nomeOrganizzazione: any = '';
  prefix : any = ''; 
  verifica: boolean = true;

  constructor(private http: ServizioHttpService , private router : Router ,) {}

  form_nome_organizazzione = new FormGroup({
    // form group
    nome: new FormControl('', { validators: [Validators.required] }),
    organizazzione: new FormControl('', { validators: [Validators.required] }),
  });

  Invio_dati() {
    this.prefix = this.form_nome_organizazzione.value.organizazzione?.trimEnd().trimStart(); 
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
            if (this.prefix == this.array[i].prefix) {
              console.log(' prefisso gia presente ');
              this.verifica = false;
              break; 
            } else {
              console.log(' prefisso non presente ');
              this.verifica = true;
              this.router.navigate(['/step2']);
            }
          }
        },
      });
  }

}
