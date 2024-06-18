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
  contatore : Array<number> = [ 0 ]; 

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
  });

  aggiungi_text()
  {
    this.contatore.push(0); 
  }

  invio_Catalean()
  {

  }
}
