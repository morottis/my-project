import { Component } from '@angular/core';
import { routes } from '../../app.routes';
import { RouterOutlet,RouterLink } from '@angular/router';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-secondform',
  standalone: true,
  imports: [RouterLink , RouterOutlet  , SidebarComponent , ReactiveFormsModule,],
  templateUrl: './secondform.component.html',
  styleUrl: './secondform.component.css'
})
export class SecondformComponent {
  
  gruppo_checkbox = new FormGroup({
    SmartCo: new FormControl(false, {}),
    Datalean: new FormControl(false, {}),
    Catalean: new FormControl(false, {})
  });
  
  invio()
  {
    console.log(" inviato"); 
    console.log(this.gruppo_checkbox.value.SmartCo);
    console.log(this.gruppo_checkbox.value.Datalean);
    console.log(this.gruppo_checkbox.value.Catalean);
  }

  controllo() : boolean
  {
    //console.log( this.gruppo_checkbox.value); 
    if(this.gruppo_checkbox.value.Catalean == false && this.gruppo_checkbox.value.Datalean == false   && this.gruppo_checkbox.value.SmartCo == false)
      {
        return true ; 
      }
      else
      {
        return false ; 
      }
  }
}
