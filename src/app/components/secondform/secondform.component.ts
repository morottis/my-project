import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, Route } from '@angular/router';
import { SidebarComponent } from '../sidebar/sidebar.component';
import {FormControl,FormGroup,ReactiveFormsModule,Validators,} from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { SmartCoComponent } from '../smart-co/smart-co.component';
import { CataleanComponent } from '../catalean/catalean.component';
import { Router } from '@angular/router';
import { PassagioDatiService } from '../../service/passagio-dati.service';

@Component({
  selector: 'app-secondform',
  standalone: true,
  imports: [
    RouterLink,
    RouterOutlet,
    SidebarComponent,
    ReactiveFormsModule,
    CommonModule,
    MatSelectModule,
    MatInputModule,
    MatFormFieldModule,
    SmartCoComponent, 
    CataleanComponent
  ],
  templateUrl: './secondform.component.html',
  styleUrl: './secondform.component.css',
})
export class SecondformComponent {
  controllo_comparsa_smartco: boolean = false; // utilizzo per i controlli di visualizzazione successiva dei form 
  controllo_comparsa_catalean : boolean = false ; 
  controllo_comparsa_entrambi : boolean = false ;  

  controllo_invio_form_catalean : boolean = false; 
  controllo_scomparsa_catalean : boolean = true ; 

  gruppo_checkbox = new FormGroup({
    SmartCo: new FormControl(false, {}),
    Catalean: new FormControl(false, {}),
    nessuno: new FormControl(false, {}),
  });

  constructor( private router : Router , private service : PassagioDatiService)
  {
  }

  ricevo_dati(value : boolean , )
  {
    this.controllo_invio_form_catalean = value; 
    
  }
  
  controllo(): boolean { // controllo se il bottone puo esserte cliccato oppure no 
    if (
      this.gruppo_checkbox.value.Catalean == false && this.gruppo_checkbox.value.SmartCo == false && this.gruppo_checkbox.value.nessuno == false) 
      {
      return true;
    } 
    else 
    {
      if((this.gruppo_checkbox.value.Catalean == true || this.gruppo_checkbox.value.SmartCo == true ) && this.gruppo_checkbox.value.nessuno == true)
      {
        return true
      }
      else
      {
        return false;
      }
    }
  }
  
  invio(): boolean {
    if(this.gruppo_checkbox.value.SmartCo == true)
      {
        if(this.gruppo_checkbox.value.Catalean == true)
          {
            return this.controllo_comparsa_entrambi = true  , this.controllo_comparsa_catalean = false  ,  this.controllo_comparsa_smartco = false;
          }
          else
          {
            return this.controllo_comparsa_smartco = true , this.controllo_comparsa_catalean = false ;
          }
      }
      else if(this.gruppo_checkbox.value.Catalean == true)
      {
        return this.controllo_comparsa_catalean = true , this.controllo_comparsa_smartco = false; 
      }   
      else
      {
        this.service.modifico_dato_catalean(false);
        this.service.modifico_dato_smartco(false); 
        this.router.navigate(['/step3']);
        return this.controllo_comparsa_catalean = false  ,  this.controllo_comparsa_smartco = false; 

      }
  }

}
