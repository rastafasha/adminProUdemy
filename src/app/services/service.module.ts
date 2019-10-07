import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { SidebarService, SettingsService, SharedService, UsuarioService, LoginGuardGuard, SubirArchivoService} from './service.index';


@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    SidebarService,
    SettingsService,
    SharedService,
    UsuarioService,
    LoginGuardGuard,
    SubirArchivoService
  ],
  declarations: []

})
export class ServiceModule { }
