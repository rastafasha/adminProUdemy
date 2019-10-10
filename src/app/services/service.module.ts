import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ModalUploadService } from '../components/modal-upload/modal-upload.service';


import { SidebarService, SettingsService, SharedService,
  UsuarioService, SubirArchivoService, HospitalService, MedicoService, 
  LoginGuardGuard, AdminGuard, VerificaTokenGuard} from './service.index';
  



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
    SubirArchivoService,
    ModalUploadService,
    HospitalService,
    MedicoService,
    LoginGuardGuard,
    AdminGuard,
    VerificaTokenGuard
  
  ],
  declarations: []

})
export class ServiceModule { }
