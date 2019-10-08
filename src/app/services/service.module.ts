import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { SidebarService, SettingsService, SharedService, UsuarioService, LoginGuardGuard, SubirArchivoService} from './service.index';
<<<<<<< HEAD
=======
import { ModalUploadService } from '../components/modal-upload/modal-upload.service';
>>>>>>> arrelgo de sweetalert-mantenimiento usuarios


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
<<<<<<< HEAD
    SubirArchivoService
=======
    SubirArchivoService,
    ModalUploadService
>>>>>>> arrelgo de sweetalert-mantenimiento usuarios
  ],
  declarations: []

})
export class ServiceModule { }
