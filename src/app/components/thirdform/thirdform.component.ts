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
import { PassagioDatiService } from '../../service/passagio-dati.service';
import { Subscription } from 'rxjs';


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
  scelta_catalean : boolean = false ; 
  scelta_smartCo : boolean = false ; 

  constructor ( private http : ServizioHttpService , private fb : FormBuilder , private service : PassagioDatiService)
  {
    this.dynamicForm = this.fb.group({ });
    this.service.sharedData$.subscribe( data => { this.scelta_catalean = data })
    console.log(this.scelta_catalean); 
    this.service.sharedData_SmartCo.subscribe( data => { this.scelta_smartCo = data })
    console.log("smartCO : " + this.scelta_smartCo); 
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

  dynamicForm : FormGroup;

  private addControls(): void {
    console.log(this.array_nomi_permission.length); 
    for( let i =0 ; i <this.array_nomi_permission.length ; i++)
      {
        console.log(this.array_nomi_permission[i]);
        
        //this.dynamicForm.addControl(this.array_nomi_permission[i] , this.fb.control(false )); 
         if( this.array_nomi_permission[i] == 'READ_MEDIA_LIBRARY' || this.array_nomi_permission[i] == 'READ_FEATURES')
          {
            this.dynamicForm.addControl(this.array_nomi_permission[i] , this.fb.control(true , Validators.required )); 
          }
          else if( this.scelta_catalean == true && (this.array_nomi_permission[i] == 'READ_PRODUCTS' || this.array_nomi_permission[i] == 'EDIT_APPLICATION_USERS'))
          {
            this.dynamicForm.addControl(this.array_nomi_permission[i] , this.fb.control(true , Validators.required)); 
          }
          else if( this.scelta_smartCo == true && (this.array_nomi_permission[i] == 'READ_COMMUNICATIONS' || this.array_nomi_permission[i] == 'READ_APPLICATION_USERS' || this.array_nomi_permission[i] == 'READ_APPLICATION_GROUPS'))
          {
            this.dynamicForm.addControl(this.array_nomi_permission[i] , this.fb.control(true , Validators.required)); 
          }
          else if( (this.scelta_smartCo == true && this.scelta_catalean == true ) && (this.array_nomi_permission[i] == 'READ_COMMUNICATIONS' || this.array_nomi_permission[i] == 'READ_APPLICATION_USERS' || this.array_nomi_permission[i] == 'READ_APPLICATION_GROUPS' || this.array_nomi_permission[i] == 'READ_PRODUCTS' || this.array_nomi_permission[i] == 'EDIT_APPLICATION_USERS'))
          {
              this.dynamicForm.addControl(this.array_nomi_permission[i] , this.fb.control(true , Validators.required)); 
          }
          else
          {
            this.dynamicForm.addControl(this.array_nomi_permission[i] , this.fb.control(false )); 
          }
      }
    
  }

  invio()
  {
    console.log(this.dynamicForm.value);
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


