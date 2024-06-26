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
  selector: 'app-fourthform',
  standalone: true,
  imports: [MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
    CommonModule,
    SidebarComponent,
    RouterLink,
    RouterOutlet],
  templateUrl: './fourthform.component.html',
  styleUrl: './fourthform.component.css'
})
export class FourthformComponent {

  array : Array<string> | any = [] ; 
  UUID : string = '' ; 
  UUID_roles : string = ''; 
  constructor( private http  : ServizioHttpService , private service : PassagioDatiService , private route : Router)
  {

    this.service.shareDataUUID.subscribe((UUID) => {
      this.UUID = UUID;
    });
    console.log(this.UUID); 

    this.service.shareDataUUIDRoles.subscribe( (UUID_roles) => { this.UUID_roles = UUID_roles})
    console.log(this.UUID_roles); 
  }

  form_user = new FormGroup({
    // form group
    mail: new FormControl('', { validators: [Validators.required , Validators.email] }),// username == mail // firts e second == prima parte mail 
    password: new FormControl('', { validators: [Validators.required] }),
  });

  Invio_dati() {

    this.array =  this.form_user.value.mail?.split( '@'); 
    console.log(this.array); 
    let dati = { 
      email : this.form_user.value.mail?.trimEnd().trimStart()  , password : this.form_user.value.password?.trimEnd().trimStart() , firstName : this.array[0]?.trimEnd().trimStart() 
     , lastName : this.array[1]?.trimEnd().trimStart() , username : this.form_user.value.mail?.trimEnd().trimStart() ,  roles : [{ uuid : this.UUID_roles}]}
    //this.serve.post().subscribe( data => {})
    console.log(dati);
    this.http.post('https://user.datalean-nodejs-dev.catalean.com/user' , dati , this.UUID ).subscribe( data => { console.log(data)});  // arry d ' oggetti 
    this.route.navigate(['/step5']); 
   
  }

}
