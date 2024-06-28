import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, Route } from '@angular/router';
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
import { SmartCoComponent } from '../smartCo/smartCo.component';
import { CataleanComponent } from '../catalean/catalean.component';
import { Router } from '@angular/router';
import { OrganizationState } from '../../service/organization-state.service';

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
    CataleanComponent,
  ],
  templateUrl: './integration-form.component.html',
  styleUrl: './integration-form.component.css',
})
export class IntegrationForm {
  controlloComparsa: boolean = false;

  controlloInvioFormCatalean: boolean = false;
  

  integrationFormGroup = new FormGroup({
    smartCo: new FormControl(false, {}),
    catalean: new FormControl(false, {}),
    nessuno: new FormControl(false, {}),
  });

  constructor(private router: Router, private integrationData: OrganizationState) {
  }

  takeData(value: boolean) {
    this.controlloInvioFormCatalean = value;
  }


  onsubmit() {
    this.controlloComparsa=true ; 
    console.log( this.integrationFormGroup.value.smartCo);
    console.log(this.integrationFormGroup.value.catalean); 
    console.log(this.controlloInvioFormCatalean);
     
 }
}