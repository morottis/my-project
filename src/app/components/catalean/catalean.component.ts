import { Component, Output , EventEmitter } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { SidebarComponent } from '../sidebar/sidebar.component';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  FormArray, FormBuilder,
  Validators,
} from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { SmartCoComponent } from '../smart-co/smart-co.component';


@Component({
  selector: 'app-catalean',
  standalone: true,
  imports: [     RouterLink,
    RouterOutlet,
    SidebarComponent,
    ReactiveFormsModule,
    CommonModule,
    MatSelectModule,
    MatInputModule,
    MatFormFieldModule,
    SmartCoComponent],
  templateUrl: './catalean.component.html',
  styleUrl: './catalean.component.css'
})
export class CataleanComponent {

  @Output() evento = new EventEmitter<boolean>();  ; 

  controllo_click : boolean = false; 
  //controllo_chiusura :boolean = false ;  
  contatore : Array<number> = [0]; 
  formArrayGroup: FormGroup; // l' arry che crera  il form group che conterra un form di array 
  formArrayGrouptext : FormGroup ;  

  Catalean_form = new FormGroup({
    Name: new FormControl('', { validators: Validators.required }),
    Version: new FormControl('', { validators: Validators.required }),
    CataleanAccountld: new FormControl('', {}),
    MapContainerUUlD: new FormControl('', {}),
    TextSearchFields: new FormControl('', {}),
    LastConsolidationDate: new FormControl('', {}),
    DownloadLinklos: new FormControl('', {}),
    DownloadLinkAndroid: new FormControl('', {}),
    DownloadLinkElectron: new FormControl('', {}),
    ResourceBatchLimit: new FormControl('', {}),
    AutoHideVerticalFilter: new FormControl(false , {}),
    EmptyResultMessage: new FormControl('', {}),
    FirstSearchMessage: new FormControl('' , {}),
    UrlWebSite: new FormControl('', {}),
    CompanyLogo: new FormControl('' , {}),
    text: new FormControl('', {}),
  });


  invio_Catalean()  // variabile o return 
  {
    console.log( 'inviato '); 
    console.log(this.formArrayGroup.value);
    console.log(this.formArrayGrouptext.value);
    this.formArrayGroup.reset
    this.controllo_click = true ; 
    //this.controllo_chiusura = true ; 
    this.evento.emit(this.controllo_click); 
  }

  /*invio_data()
  {
    this.evento.emit(this.controllo_click); 
  }*/
  constructor(private fb: FormBuilder) {
    this.formArrayGroup = this.fb.group({ //fb.group crea il primo form group 
      formGroups: this.fb.array([
      ])//il primo form group contiene un form array 
    }); 
    this.formArrayGrouptext = this.fb.group(
    {
      formGroupstext : this.fb.array([])
    }); 
  }

  get formGroups() { // viene preso nel ngFor
    return this.formArrayGroup.get('formGroups') as FormArray; // usato per accedere al form group
  }
  get formGroupstext()
  {
    return this.formArrayGrouptext.get('formGroupstext') as FormArray ; 
  }

  aggiungi_text()
  {
    const newFormGroup = this.fb.group(
      {
        TextSearchFields : [''], 
      }
    ) 
    this.formGroupstext.push(newFormGroup); 
  }

  rimuoviFormGrouptext(index: number)
  {
    this.formGroupstext.removeAt(index);// prendo il form  group con il get e lo elimino grazie all' indice add esso asegnato 
  }

  aggiungi_FormGroup() 
  {
    const newFormGroup = this.fb.group({ // creo unu altro form group 
      Title: [''],
      Iconcls: [''],
      Url : ['']
    });
    this.formGroups.push(newFormGroup);// lo push nell array di form group 
  }

  rimuoviFormGroup(index: number)
  {
    this.formGroups.removeAt(index);// prendo il form  group con il get e lo elimino grazie all' indice add esso asegnato 
  }


}




