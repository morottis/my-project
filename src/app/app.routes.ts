import { Routes  } from '@angular/router';
import { IntegrationForm } from './components/integration-form/integration-form.component';
import { PermissionsForm } from './components/permissions-form/permissions-form.component';
import { UserFormComponent } from './components/user-form/user-form.component';
import { LanguagesFormComponent } from './components/languages-form/languages-form.component';
import { OrganizationForm } from './components/organization-form/organization-form.component';



export const routes: Routes = [
    {path : 'step2' , component : IntegrationForm},
    {path : 'step3' , component : PermissionsForm},
    {path : 'step4' , component : UserFormComponent},
    {path : 'step5' , component : LanguagesFormComponent},
    {path : '', component : OrganizationForm}
];
