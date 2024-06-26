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
import { PassagioDatiService } from '../../service/passagio-dati.service';


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
  nomeDb : any = ''; 
  scrittaErrore : string = ''; 

  constructor(private http: ServizioHttpService , private router : Router , private passagio_dati : PassagioDatiService) {

  }

  formNomeOrganizazzione= new FormGroup({
    // form group
    nome: new FormControl('', { validators: [Validators.required] }),
    organizazzione: new FormControl('', { validators: [Validators.required] }),
    dbname : new FormControl('', { validators: [Validators.required] }),
  });

  Invio_dati() {
    this.prefix = this.formNomeOrganizazzione.value.organizazzione?.trimEnd().trimStart();
    this.nomeDb = this.formNomeOrganizazzione.value.dbname?.trimEnd().trimStart(); 
    console.log(this.nomeOrganizzazione);
    //this.form_nome_organizazzione.reset();
    this.http.prendoValore<ObjectData[]>(
        'https://organization.datalean-nodejs-dev.catalean.com/organization'
      )
      .subscribe({
        next: (data) => {
          console.log(data);
          this.array = data;
          for (let i = 0; i < this.array.length; i++) {
            if (this.prefix == this.array[i].prefix) {
              console.log(' prefisso gia presente ');
              this.scrittaErrore = 'prefisso errato'; 
              this.verifica = false;
              break; 
            } else {
              if(this.nomeDb == this.array[i].dbname)
                {
                  console.log("nomedb presente "); 
                  this.scrittaErrore = 'nomedb errato '; 
                  this.verifica = false ; 
                  break; 
                }
              console.log(' prefisso non presente  o nomedb non presente ');
              this.verifica = true;
              this.router.navigate(['/step2']);
            }
          }
        },
      });
    
      this.passagio_dati.datiOrganizazione(this.formNomeOrganizazzione.value.nome , this.formNomeOrganizazzione.value.dbname , this.formNomeOrganizazzione.value.organizazzione);     
  }

}
