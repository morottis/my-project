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
  arraySideBar :Array <string> =['STEP 1' , 'STEP 2' , 'STEP 3'];  
  clickSide : boolean = false ; 

  sideBar()
  {
    if( this.clickSide == true)
    {
      this.clickSide = false 
    }
    else
    {
      this.clickSide = true
    }
  }
}
