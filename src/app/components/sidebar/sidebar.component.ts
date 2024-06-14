import { Component } from '@angular/core';
import { CommonModule, NgStyle } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  array_side_bar :Array <string> =['SIDE BAR' , 'STEP 1' , 'STEP 2' , 'STEP 3'];  
  click_side : boolean = false ; 

  side_bar()
  {
    if( this.click_side == true)
    {
      console.log(" nel if")
      this.click_side = false 
    }
    else
    {
      console.log(" nel else")
      this.click_side = true
    }
  }
}
