import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { SidebarComponent } from '../sidebar/sidebar.component';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-smart-co',
  standalone: true,
  imports: [RouterLink,
    RouterOutlet,
    SidebarComponent,
    ReactiveFormsModule,
    CommonModule,
    MatSelectModule,
    MatInputModule,
    MatFormFieldModule,],
  templateUrl: './smart-co.component.html',
  styleUrl: './smart-co.component.css'
})
export class SmartCoComponent {

  contatore : Array<number> = [ 0 ] ; 
  formArrayGroup: FormGroup;
  
  SmartCo_form = new FormGroup({
    Name: new FormControl('', { validators: Validators.required }),
    Version: new FormControl('', { validators: Validators.required }),
    DownloadLinkAndroid: new FormControl('', {}),
    DownloandLinkIos: new FormControl('', {}),
    CommunicationFeatureUUlD: new FormControl('', {}),
    HighlightsUUID: new FormControl('', {}),
    FirstPageUUID: new FormControl('', {}),
    StickyUUID: new FormControl('', {}),
    PinToTopCap: new FormControl('', {}),
    HighlightLimit: new FormControl('', {}),
  });

  bottone_features()
  {
    this.contatore.push(0); 
  }
  
  constructor(private fb: FormBuilder) {
    this.formArrayGroup = this.fb.group({ //fb.group crea il primo form group 
      formGroups: this.fb.array([])//il primo form group contiene un form array 
    });
  }

  get formGroups() { // viene preso nel ngFor
    return this.formArrayGroup.get('formGroups') as FormArray; // usato per accedere al form group
  }

  aggiungi_FormGroup() 
  {
    const newFormGroup = this.fb.group({ // creo unu altro form group 
      PinToTopCap: [' '],
      HighlightLimit: [' ']
    });
    this.formGroups.push(newFormGroup);// lo push nell array di form group 
  }

  rimuoviFormGroup(index: number)
  {
    this.formGroups.removeAt(index);// prendo il form  group con il get e lo elimino grazie all' indice add esso asegnato 
  }
  
  invio_SmartCo() 
  {
    console.log(this.formArrayGroup.value);
    this.formArrayGroup.reset
  }
}
