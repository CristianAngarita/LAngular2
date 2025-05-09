import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { AuthGuard } from './services/auth.guard';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },// Carga el componente HomeComponent.
    { path: 'login', component: LoginComponent }, // Carga el formulario de login.
    { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] }, //  Ruta protegida: solo usuarios autenticados pueden acceder. Si no hay token, AuthGuard redirige automáticamente a /login.
    { path: '**', redirectTo: '' } // si ponen algo raro en la URL, los manda a Home
];
