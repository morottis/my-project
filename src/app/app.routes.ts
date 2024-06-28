import { Routes  } from '@angular/router';
import { IntegrationForm } from './components/integration-form/integration-form.component';
import { ThirdformComponent } from './components/thirdform/thirdform.component';
import { FourthformComponent } from './components/fourthform/fourthform.component';
import { FifthformComponent } from './components/fifthform/fifthform.component';
import { OrganizationForm } from './components/organization-form/organization-form.component';



export const routes: Routes = [
    {path : 'step2' , component : IntegrationForm},
    {path : 'step3' , component : ThirdformComponent},
    {path : 'step4' , component : FourthformComponent},
    {path : 'step5' , component : FifthformComponent},
    {path : '', component : OrganizationForm}
];
