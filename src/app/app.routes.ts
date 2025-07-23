import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AuthGuard } from './auth.guard';
import { NotFoundComponent } from './not-found/not-found.component';
import { PatientTableComponent } from './patient-table/patient-table.component';
import { NurseTableComponent } from './nurse-table/nurse-table.component';
import { SignoutComponent } from './signout/signout.component';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' }, // Simple redirection
    { path: 'login', component: LoginComponent }, // Login route
    { path: 'signout', component: SignoutComponent }, // Signout route
    { path: 'dashboard', component: DashboardComponent }, // Guard applied here
    { path: 'patients', component: PatientTableComponent, canActivate: [AuthGuard] }, // Guard applied here
    { path: 'nurses', component: NurseTableComponent, canActivate: [AuthGuard] }, // Guard applied here
    { path: '**', component: NotFoundComponent }, // Wildcard route for 404
];
