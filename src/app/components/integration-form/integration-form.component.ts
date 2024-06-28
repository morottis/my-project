import { Component, DoCheck, OnChanges, SimpleChanges } from '@angular/core';
import { RouterOutlet, RouterLink, Route } from '@angular/router';
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
export class IntegrationForm implements DoCheck {
  controlloComparsa: boolean = false;

  controlloInvioFormCatalean: boolean = false;

  integrationFormGroup = new FormGroup({
    smartCo: new FormControl(false, {}),
    catalean: new FormControl(false, {}),
    nessuno: new FormControl(false, {}),
  });

  constructor(private router: Router) {}
  ngDoCheck(): void {
    if (this.integrationFormGroup.value.nessuno === true) {
      this.router.navigate(['/step3']);
    }
  }

  takeData(value: boolean) {
    this.controlloInvioFormCatalean = value;
  }

  onsubmit() {
    this.controlloComparsa = true;
    console.log(this.integrationFormGroup.value.smartCo);
    console.log(this.integrationFormGroup.value.catalean);
    console.log(this.controlloInvioFormCatalean);
  }
}
