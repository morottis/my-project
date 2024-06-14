import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FirtsformComponent } from './components/firtsform/firtsform.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet , FirtsformComponent , SidebarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'my-project';
  var : string = ''
}
