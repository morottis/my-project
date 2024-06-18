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
import { CataleanComponent } from '../catalean/catalean.component';

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
  controllo_comparsa_smartco: boolean = false;
  controllo_comparsa_catalean : boolean = false ; 
  controllo_comparsa_entrambi : boolean = false ; 
  //contatore : Array<number> = [ 0 ] ; 

  gruppo_checkbox = new FormGroup({
    SmartCo: new FormControl(false, {}),
    Catalean: new FormControl(false, {}),
    nessuno: new FormControl(false, {}),
  });

  /*SmartCo_form = new FormGroup({
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
  });*/

  /*Catalean_form = new FormGroup({
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
  });*/

  controllo(): boolean {
    if (
      this.gruppo_checkbox.value.Catalean == false &&
      this.gruppo_checkbox.value.SmartCo == false &&
      this.gruppo_checkbox.value.nessuno == false
    ) {
      return true;
    } else {
      return false;
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
        return this.controllo_comparsa_catalean = false  ,  this.controllo_comparsa_smartco = false; 
      }
  }
  /*bottone_features()
  {
    this.contatore.push(0); 
  }*/
  /*invio_SmartCo() 
  {

  }*/

  /*invio_Catalean()
  {

  }*/
}
