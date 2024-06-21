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
  array_nomi_permission : Array<string>  = []; 
  numero : string = '5% ' ;  // -6 
  string : string = '' ; 
  form_checkbox!: FormGroup;  

  constructor ( private http : ServizioHttpService , private fb : FormBuilder)
  {
    this.dynamicForm = this.fb.group({ });
    console.log('costruttore'); 
  }


  ngOnInit(): void {
    this.http.getJson<Jsonvalue>().subscribe({ next : (data : Jsonvalue) => { // specifico con Jsonvalue che il valore e di tipo interfaccia jsonvalue
      console.log(data); 
      this.array_permission = data;
          for (let index = 0; index < this.array_permission.permissions.length; index++) {
            this.array_nomi_permission[index] =  this.array_permission.permissions[index].name;
            //console.log( this.array_nomi_permission[index] ); 
          } 
          console.log(this.array_nomi_permission); 
          this.addControls();   
     }}); 
     
  }

  /* INIZIO */ 
  dynamicForm : FormGroup;

  private addControls(): void {
    console.log(this.array_nomi_permission.length); 
    for( let i =0 ; i <this.array_nomi_permission.length ; i++)
      {
        console.log(this.array_nomi_permission[i]);
        
        this.dynamicForm.addControl(this.array_nomi_permission[i] , this.fb.control(false )); 
      }
    
  }

  onSubmit(): void {
   console.log(this.dynamicForm);  
  }
}

  /*get array_form (): FormArray
  {
    return this.form_checkbox.get('array_form') as FormArray ; 
  }
  
  inviato()
  {
    console.log(this.array_form); 
  }*/


