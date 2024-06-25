import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { RouterModule } from '@angular/router';

import { FirtsformComponent } from './components/firtsform/firtsform.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { ServizioHttpService } from './service/servizio-http.service';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FirtsformComponent, SidebarComponent , CommonModule , RouterModule],
  providers: [ServizioHttpService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent  {
  router = inject(Router) ;
   
  /*ngOnInit(): void {
    this.router.navigate(['']); 
  }*/

  title = 'my-project';
  var : string = ''
}
