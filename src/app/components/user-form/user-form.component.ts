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
import { ServizioHttpService } from '../../service/servizio-http.service';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { OrganizationState } from '../../service/organization-state.service';
import { environment } from '../../../environment';
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
    private http: ServizioHttpService,
    private takeData: OrganizationState,
    private route: Router
  ) {
    this.takeData.shareDataUUID.pipe(first()).subscribe((UUID) => {
      this.organizationUUID = UUID;
    });
  

    this.takeData.shareDataUUIDRoles.pipe(first()).subscribe((UUID_roles) => {
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
    /*
    if (splittedEmail) {
      let dati = {
        email: this.userForm.value.mail?.trim(),
        password: this.userForm.value.password?.trim(),
        firstName: splittedEmail[0]?.trim(),
        lastName: splittedEmail[1]?.trim(),
        username: this.userForm.value.mail?.trim(),
        roles: [{ uuid: this.roleUUID }],
      };
      console.log(dati);
      this.http
        .createEntity(environment.usersUrl, dati, this.organizationUUID)
        .subscribe((data) => {
          console.warn(data);
        }); // array d ' oggetti
      this.route.navigate(['/step5']);
    }*/
    this.route.navigate(['/step5']);
  }
}
