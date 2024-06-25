import { Routes , RouterModule } from '@angular/router';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { FirtsformComponent } from './components/firtsform/firtsform.component';
import { SecondformComponent } from './components/secondform/secondform.component';
import { ThirdformComponent } from './components/thirdform/thirdform.component';
import { FourthformComponent } from './components/fourthform/fourthform.component';
import { FifthformComponent } from './components/fifthform/fifthform.component';

export const routes: Routes = [
    {path : 'step2' , component : SecondformComponent},
    {path : 'step3' , component : ThirdformComponent},
    {path : 'step4' , component : FourthformComponent},
    {path : 'step5' , component : FifthformComponent},
    {path : '', component : FirtsformComponent}
];
