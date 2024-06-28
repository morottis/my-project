import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, Router } from '@angular/router';
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
import { OrganizationState } from '../../service/organization-state.service';

@Component({
  selector: 'app-smart-co',
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
  templateUrl: './smartCo.component.html',
  styleUrl: './smartCo.component.css',
})
export class SmartCoComponent {
  formArrayGroupMenuItems: FormGroup;

  smartcoForm = new FormGroup({
    name: new FormControl('', { validators: Validators.required }),
    version: new FormControl('', { validators: Validators.required }),
    downloadLinkAndroid: new FormControl('', {}),
    downloandLinkIos: new FormControl('', {}),
    communicationFeatureUUID: new FormControl('', {}),
    highlightsUUID: new FormControl('', {}),
    firstPageUUID: new FormControl('', {}),
    stickyUUID: new FormControl('', {}),
    pinToTopCap: new FormControl('', {}),
    highlightLimit: new FormControl('', {}),
  });

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private service: OrganizationState
  ) {
    this.formArrayGroupMenuItems = this.fb.group({
      //fb.group crea il primo form group
      MenuItems: this.fb.array([]), //il primo form group contiene un form array
    });
  }

  get MenuItems() {
    // viene preso nel ngFor
    return this.formArrayGroupMenuItems.get('MenuItems') as FormArray; // usato per accedere al form group
  }

  addFormGroup() {
    const newFormGroup = this.fb.group({
      // creo unu altro form group
      pinToTopCap: [''],
      highlightLimit: [''],
    });
    this.MenuItems.push(newFormGroup); // lo push nell array di form group
  }

  removeFormGroup(index: number) {
    this.MenuItems.removeAt(index); // prendo il form  group con il get e lo elimino grazie all' indice add esso asegnato
  }

  onSubmit() {
    console.log(this.smartcoForm);
    console.log(this.formArrayGroupMenuItems.value);
    this.formArrayGroupMenuItems.reset;
    this.service.modifySmartcoData(true);
    this.router.navigate(['/step3']);
  }
}
