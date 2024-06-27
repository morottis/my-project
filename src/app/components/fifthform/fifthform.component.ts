import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ServizioHttpService } from '../../service/servizio-http.service';
import { PassagioDatiService } from '../../service/passagio-dati.service';
import { CommonModule } from '@angular/common';
import {MatRadioModule} from '@angular/material/radio';
import { ConfigurationService } from '../../service/configuration.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-fifthform',
  standalone: true,
  imports: [ReactiveFormsModule , CommonModule , MatRadioModule],
  templateUrl: './fifthform.component.html',
  styleUrl: './fifthform.component.css'
})
export class FifthformComponent {

  gruppo_checkbox_lingue = new FormGroup({
    it_IT :  new FormControl ( false , []),
    en_US : new FormControl ( true , Validators.requiredTrue),
    es_ES : new FormControl( false , []),  
    de_DE : new FormControl( false  , []), 
    fr_FR : new FormControl( false , []) 
  })

  gruppoLingueDefault = new FormGroup(
    {
      default: new FormControl('' , Validators.required)
    }
  )
  array_controllo : Array<string> = ['it_IT' , 'en_US' , 'es_ES' , 'de_DE' , 'fr_FR'];
  array_value_true : Array<string> = []; 
  contollo : boolean = false ; 
  UUID : any; 
  cambioPagina : boolean ; 

  constructor(private http : ServizioHttpService , private organizationUUID : PassagioDatiService , private config : ConfigurationService , private route : Router){

    organizationUUID.UUIDSubject.subscribe( UUID => { this.UUID = UUID , console.log(UUID)}); 
    this.cambioPagina = false; 
  }

  invio()
  {
    this.array_value_true = this.array_controllo.filter(item => this.gruppo_checkbox_lingue.get(item)?.value === true);
    this.config.createConfig({ value : this.array_value_true  , sensitive : false  , key : 'activeLocales'  , type : 'array' }).subscribe({ next : data  => { console.log( data )}}); // key :  defaultLocale , type : string  , sentive false  , value : form value 
    this.cambioPagina = true 
  }
  invioDefault()
  {
    console.log(this.gruppoLingueDefault.value);
    this.config.createConfig({key :  'defaultLocale' , type : 'string'  , sensitive : false  , value : this.gruppoLingueDefault.value }).subscribe ( { next  :  data =>  { 
      console.log(data) 
      if( data === null )
        {
          this.contollo = true ; 
        }
      }})
    
  }

  

}
