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
import { SharedModule } from './shared/shared.modulo';




@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    APP_ROUTES,
    PagesModule,
    FormsModule,
    ReactiveFormsModule,
    ServiceModule,
    SharedModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
