import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { SidebarComponent } from '../sidebar/sidebar.component';
import {
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

  invio_SmartCo() 
  {

  }
}
