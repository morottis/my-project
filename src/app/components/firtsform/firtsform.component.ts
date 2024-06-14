import { Component } from '@angular/core';
import { FormControl,FormGroup,ReactiveFormsModule,Validators} from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '../sidebar/sidebar.component';

@Component({
  selector: 'app-firtsform',
  standalone: true,
  imports: [MatFormFieldModule,MatInputModule,MatSelectModule,ReactiveFormsModule,CommonModule,SidebarComponent],
  templateUrl: './firtsform.component.html',
  styleUrl: './firtsform.component.css',
})
export class FirtsformComponent {

  form_nome_organizazzione = new FormGroup({ // form group
    nome: new FormControl('', { validators: [Validators.required] }),
    organizazzione: new FormControl('', { validators: [Validators.required] }),
  });

  Invio_dati() {
    console.log("hai inviato tutto"); 
    this.form_nome_organizazzione.reset();
  } // funzione eseguita al submit del form
}
