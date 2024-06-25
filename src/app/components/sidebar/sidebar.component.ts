import { Component } from '@angular/core';
import { CommonModule} from '@angular/common';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  array_side_bar :Array <string> =['STEP 1' , 'STEP 2' , 'STEP 3'];  
  click_side : boolean = false ; 

  side_bar()
  {
    if( this.click_side == true)
    {
      this.click_side = false 
    }
    else
    {
      this.click_side = true
    }
  }
}
