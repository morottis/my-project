import { Component, Output, EventEmitter, Input } from '@angular/core';
import { RouterOutlet, RouterLink, Router } from '@angular/router';
import { SidebarComponent } from '../sidebar/sidebar.component';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  FormArray,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { OrganizationState } from '../../service/organization-state.service';

@Component({
  selector: 'app-catalean',
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
  ],
  templateUrl: './catalean.component.html',
  styleUrl: './catalean.component.css',
})
export class CataleanComponent {
  @Output() submitClick = new EventEmitter<boolean>();
  @Input() isSmartcoLast: boolean = false; // li utilizzo per prendere i dati dal secondo form e capire se cliccando invio lo mando al prossimo form oppure lo faccio con smartco

  controlClick: boolean = false;
  formArrayGroupMenuItems: FormGroup; // l' array che crera  il form group che conterra un form di array
  formArrayGroupTextSearchFields: FormGroup;

  cataleanForm = new FormGroup({
    name: new FormControl('', { validators: Validators.required }),
    version: new FormControl('', { validators: Validators.required }),
    cataleanAccountId: new FormControl('', {}),
    mapContainerUUID: new FormControl('', {}),
    textSearchFields: new FormControl('', {}),
    lastConsolidationDate: new FormControl('', {}),
    downloadLinkIos: new FormControl('', {}),
    downloadLinkAndroid: new FormControl('', {}),
    downloadLinkElectron: new FormControl('', {}),
    resourceBatchLimit: new FormControl('', {}),
    autoHideVerticalFilter: new FormControl(false, {}),
    emptyResultMessage: new FormControl('', {}),
    firstSearchMessage: new FormControl('', {}),
    urlWebSite: new FormControl('', {}),
    companyLogo: new FormControl('', {}),
    text: new FormControl('', {}),
  });

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private cataleanData: OrganizationState
  ) {
    this.formArrayGroupMenuItems = this.fb.group({
      //fb.group crea il primo form group
      MenuItems: this.fb.array([]), //il primo form group contiene un form array
    });
    this.formArrayGroupTextSearchFields = this.fb.group({
      textSearchFields: this.fb.array([]),
    });
  }

  onSubmit() { // variabile o return
    this.controlClick = true;
    this.submitClick.emit(this.controlClick);
    console.log()

    this.cataleanData.modifyCataleanData(true);
    if (this.isSmartcoLast == false) {
      this.router.navigate(['/step3']);
    }
  }

  get MenuItems() {
    // viene preso nel ngFor
    return this.formArrayGroupMenuItems.get('MenuItems') as FormArray; // usato per accedere al form group
  }

  get textSearchFields() {
    return this.formArrayGroupTextSearchFields.get(
      'textSearchFields'
    ) as FormArray;
  }

  addTextSearchFields() {
    const newFormGroup = this.fb.group({
      textSearchFields: [''],
    });
    this.textSearchFields.push(newFormGroup);
  }

  addMenuItems() {
    const newFormGroup = this.fb.group({
      // creo unu altro form group
      title: [''],
      iconcls: [''],
      url: [''],
    });
    this.MenuItems.push(newFormGroup); // lo push nell array di form group
  }

  removeMenuItems(index: number) {
    this.MenuItems.removeAt(index); // prendo il form  group con il get e lo elimino grazie all' indice add esso asegnato
  }
}
