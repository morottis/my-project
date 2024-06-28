import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ServizioHttpService } from '../../service/servizio-http.service';
import { OrganizationState } from '../../service/organization-state.service';
import { CommonModule } from '@angular/common';
import { MatRadioModule } from '@angular/material/radio';
import { ConfigurationService } from '../../service/configuration.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-fifthform',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, MatRadioModule],
  templateUrl: './languages-form.component.html',
  styleUrl: './languages-form.component.css',
})
export class LanguagesFormComponent {
  gruppoChecboxlingue = new FormGroup({
    it_IT: new FormControl(false, []),
    en_US: new FormControl(true, Validators.requiredTrue),
    es_ES: new FormControl(false, []),
    de_DE: new FormControl(false, []),
    fr_FR: new FormControl(false, []),
  });

  gruppoLingueDefault = new FormGroup({
    default: new FormControl('', Validators.required),
  });
  arrayLanguages: Array<string> = ['it_IT', 'en_US', 'es_ES', 'de_DE', 'fr_FR'];
  arraySelectedLanguages: Array<string> = [];
  changePage: boolean;

  constructor(private submitData: OrganizationState, private route: Router) {
    this.changePage = false;
  }

  onSubmitPage() {
    this.arraySelectedLanguages = this.arrayLanguages.filter(
      (item) => this.gruppoChecboxlingue.get(item)?.value === true
    );
    this.changePage = true;
  }
  onTotalSubmit() {
    if (this.gruppoLingueDefault.value.default) {
      this.submitData.modifyLanguages(
        this.arraySelectedLanguages,
        this.gruppoLingueDefault.value.default
      );
      this.submitData.sendData();
      this.route.navigate(['/']);
    } else {
      console.warn('CHIAMATE NON EFFETTUATE LINGUE NON SELEZIONATE');
    }
  }
}
