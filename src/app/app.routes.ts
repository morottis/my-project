import { Routes , RouterModule } from '@angular/router';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { FirtsformComponent } from './components/firtsform/firtsform.component';
import { SecondformComponent } from './components/secondform/secondform.component';

export const routes: Routes = [
    {path : 'step2' , component : SecondformComponent},
    {path : '', component : FirtsformComponent}
];
