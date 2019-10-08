import { NgModule } from '@angular/core';

import { FormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.modulo';

import { PAGES_ROUTES } from './pages.routes';

<<<<<<< HEAD

=======
>>>>>>> arrelgo de sweetalert-mantenimiento usuarios
import { PagesComponent } from './pages.component';

import { ChartsModule } from 'ng2-charts';

import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';

import { ProfileComponent } from './profile/profile.component';
<<<<<<< HEAD

=======
import { UsuariosComponent } from './usuarios/usuarios.component';
import { ModalUploadComponent } from '../components/modal-upload/modal-upload.component';
>>>>>>> arrelgo de sweetalert-mantenimiento usuarios

// temporal
import { IncrementadorComponent } from '../components/incrementador/incrementador.component';
import { GraficoDonaComponent } from '../components/grafico-dona/grafico-dona.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';

import { PromesasComponent } from '../pages/promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';

// pipes module
import { PipesModule } from '../pipes/pipes.module';


<<<<<<< HEAD
=======

>>>>>>> arrelgo de sweetalert-mantenimiento usuarios
@NgModule({
    declarations: [
        PagesComponent,
        DashboardComponent,
        ProgressComponent,
        Graficas1Component,
        IncrementadorComponent,
        GraficoDonaComponent,
        AccountSettingsComponent,
        PromesasComponent,
        RxjsComponent,
<<<<<<< HEAD
        ProfileComponent
=======
        ProfileComponent,
        UsuariosComponent,
        ModalUploadComponent
>>>>>>> arrelgo de sweetalert-mantenimiento usuarios
    ],
    exports: [
        PagesComponent,
        DashboardComponent,
        ProgressComponent,
        Graficas1Component,
        IncrementadorComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
        PAGES_ROUTES,
        FormsModule,
        ChartsModule,
        PipesModule
    ]
})

export class PagesModule {}
