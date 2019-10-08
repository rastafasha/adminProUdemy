import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// Rutas
import {APP_ROUTES} from './app.routes';

// modulos
import { PagesModule } from './pages/pages.modulo';
import { ServiceModule } from './services/service.module';

// temporal
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// componentes
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './login/register.component';


<<<<<<< HEAD




=======
>>>>>>> arrelgo de sweetalert-mantenimiento usuarios
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
<<<<<<< HEAD
    RegisterComponent,
=======
    RegisterComponent
>>>>>>> arrelgo de sweetalert-mantenimiento usuarios
  ],
  imports: [
    BrowserModule,
    APP_ROUTES,
    PagesModule,
    FormsModule,
    ReactiveFormsModule,
    ServiceModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
