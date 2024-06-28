import { Component } from '@angular/core';
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
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { OrganizationState } from '../../service/organization-state.service';
import { first } from 'rxjs';

@Component({
  selector: 'app-fourthform',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
    CommonModule,
    RouterLink,
    RouterOutlet,
  ],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.css',
})
export class UserFormComponent {
  organizationUUID: string = '';
  roleUUID: string = '';
  constructor(
    private submitData: OrganizationState,
    private route: Router
  ) {
    this.submitData.shareDataUUID.pipe(first()).subscribe((UUID) => {
      this.organizationUUID = UUID;
    });
  

    this.submitData.shareDataUUIDRoles.pipe(first()).subscribe((UUID_roles) => {
      this.roleUUID = UUID_roles;
    });
    
  }

  userForm = new FormGroup({
    // form group
    mail: new FormControl('', {
    validators: [Validators.required, Validators.email],
    }), // username == mail // firts e second == prima parte mail
    password: new FormControl('', { validators: [Validators.required] }),
  });

  onSubmit() {
    let splittedEmail = this.userForm.value.mail?.split('@');
    if( splittedEmail &&  this.userForm.value.mail && this.userForm.value.password )
      {
        this.submitData.modifyUserInformation(splittedEmail[0] , splittedEmail[1] ,this.userForm.value.mail ,this.userForm.value.password  ); 
      }
    this.route.navigate(['/step5']);
  }
}
