import { Component, OnDestroy, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormControl,FormGroup,ReactiveFormsModule,Validators} from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { ServizioHttpService } from '../../service/servizio-http.service';
import { ObjectData } from '../../object-data';
import { ActivatedRoute, Router, RouterLink, RouterOutlet } from '@angular/router';
import { Jsonvalue } from '../../interface/jsonvalue';
import { BrowserModule } from '@angular/platform-browser';


@Component({
  selector: 'app-thirdform',
  standalone: true,
  imports: [MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
    CommonModule,
    SidebarComponent,
    RouterLink,
    RouterOutlet],
  templateUrl: './thirdform.component.html',
  styleUrl: './thirdform.component.css'
})
export class ThirdformComponent implements OnInit {


  array_permission : Jsonvalue | any ;
  numero : string = '5% ' ;  // -6 
  string : string = '' ; 
  form_checkbox!: FormGroup;  

  constructor ( private http : ServizioHttpService , private fb : FormBuilder)
  {
  }


  ngOnInit(): void {
    this.http.getJson<Jsonvalue>().subscribe({ next : (data : Jsonvalue) => { // specifico con Jsonvalue che il valore e di tipo interfaccia jsonvalue
      console.log(data); 
      this.array_permission = data;
          console.log( 'nel for'); 
          this.string = this.array_permission.permissions[0].name
     }}); 

     this.form_checkbox = this.fb.group({ //fb.group crea il primo form group 
      array_form: this.fb.array([
      ])
    }); 

  }

  /*get array_form (): FormArray
  {
    return this.form_checkbox.get('array_form') as FormArray ; 
  }
  
  inviato()
  {
    console.log(this.array_form); 
  }*/

}
