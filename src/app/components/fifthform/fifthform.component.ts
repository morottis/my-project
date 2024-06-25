import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-fifthform',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './fifthform.component.html',
  styleUrl: './fifthform.component.css'
})
export class FifthformComponent {

  gruppo_checkbox_lingue = new FormGroup({
    italiano :  new FormControl ( false , []),
    inglese : new FormControl ( true , Validators.requiredTrue),
    spagnolo : new FormControl( false , []),  
    tedesco : new FormControl( false  , []), 
    francese : new FormControl( false , []) 
  })

  invio()
  {
    console.log(this.gruppo_checkbox_lingue.value)
  }
}
