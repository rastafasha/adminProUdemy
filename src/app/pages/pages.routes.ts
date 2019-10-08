import { RouterModule, Routes } from '@angular/router';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';

import { LoginGuardGuard } from '../services/guards/login-guard.guard';
import { ProfileComponent } from './profile/profile.component';
<<<<<<< HEAD
=======
import { UsuariosComponent } from './usuarios/usuarios.component';
>>>>>>> arrelgo de sweetalert-mantenimiento usuarios


const pagesRoutes: Routes = [
    {
        path: '',
        component: PagesComponent,
        canActivate: [ LoginGuardGuard],
        children: [
            { path: 'dashboard', component: DashboardComponent, data: { titulo: 'Dashboard', } },
            { path: 'progress', component: ProgressComponent,  data: { titulo: 'Progress' }},
            { path: 'graficas1', component: Graficas1Component,  data: { titulo: 'Graficas' }},
            { path: 'promesas', component: PromesasComponent,  data: { titulo: 'Promesas' }},
            { path: 'rxjs', component: RxjsComponent,  data: { titulo: 'RXJS' }},
            { path: 'account-settings', component: AccountSettingsComponent,  data: { titulo: 'Ajustes del Tema' }},
<<<<<<< HEAD
            { path: 'profile', component: ProfileComponent,  data: { titulo: 'Perfil de usuario' }},
=======
            { path: 'profile', component: ProfileComponent,  data: { titulo: 'Perfil de Usuario' }},
            //Manetnimiento
            { path: 'usuarios', component: UsuariosComponent,  data: { titulo: 'Mantenimiento de Usuarios' }},
>>>>>>> arrelgo de sweetalert-mantenimiento usuarios
            { path: '', redirectTo: '/dashboard', pathMatch: 'full'},
        ]
    }
];

export const PAGES_ROUTES = RouterModule.forChild(pagesRoutes);
