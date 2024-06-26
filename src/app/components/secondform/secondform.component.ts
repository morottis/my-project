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
    CataleanComponent,
  ],
  templateUrl: './secondform.component.html',
  styleUrl: './secondform.component.css',
})
export class SecondformComponent {
  controlloComparsaSmartco: boolean = false; // utilizzo per i controlli di visualizzazione successiva dei form
  controlloComparsaCatalean: boolean = false;
  controlloComparsaEntrambi: boolean = false;

  controlloInvioFormCatalean: boolean = false;
  controlloScomparsaCatalean: boolean = true;

  gruppoCheckbox = new FormGroup({
    SmartCo: new FormControl(false, {}),
    Catalean: new FormControl(false, {}),
    nessuno: new FormControl(false, {}),
  });

  constructor(private router: Router, private service: PassagioDatiService) {}

  ricevoDati(value: boolean) {
    this.controlloInvioFormCatalean = value;
  }

  controllo(): boolean {
    // controllo se il bottone puo esserte cliccato oppure no
    if (
      this.gruppoCheckbox.value.Catalean == false &&
      this.gruppoCheckbox.value.SmartCo == false &&
      this.gruppoCheckbox.value.nessuno == false
    ) {
      return true;
    } else {
      if (
        (this.gruppoCheckbox.value.Catalean == true ||
          this.gruppoCheckbox.value.SmartCo == true) &&
        this.gruppoCheckbox.value.nessuno == true
      ) {
        return true;
      } else {
        return false;
      }
    }
  }

  invio(): boolean {
    if (this.gruppoCheckbox.value.SmartCo == true) {
      if (this.gruppoCheckbox.value.Catalean == true) {
        return (
          (this.controlloComparsaEntrambi = true),
          (this.controlloComparsaCatalean = false),
          (this.controlloComparsaSmartco = false)
        );
      } else {
        return (
          (this.controlloComparsaSmartco = true),
          (this.controlloComparsaCatalean = false)
        );
      }
    } else if (this.gruppoCheckbox.value.Catalean == true) {
      return (
        (this.controlloComparsaCatalean = true),
        (this.controlloComparsaSmartco = false)
      );
    } else {
      this.service.modificoDatoCatalean(false);
      this.service.modificoDatoSmartco(false);
      this.router.navigate(['/step3']);
      return (
        (this.controlloComparsaCatalean = false),
        (this.controlloComparsaSmartco = false)
      );
    }
  }
}
