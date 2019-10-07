import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UsuarioService } from '../services/usuario/usuario.service';
import { Usuario } from '../models/usuario.model';

declare function init_plugins();
declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  recuerdame: boolean = false;
  email: string;

  auth2: any;

  constructor(
    public router: Router,
    public usuarioService: UsuarioService
    ) { }

    ngOnInit() {
      init_plugins();
        this.attachSignin();
      }
      googleInit() {
        return new Promise((resolve, reject) => {
          gapi.load('auth2', () => {
            let auth2 = gapi.auth2.init({
              client_id: '291137676127-svvuuca518djs47q2v78se9q6iggi4nq.apps.googleusercontent.com',
              cookiepolicy: 'single_host_origin',
              scope: 'profile email'
            });
            resolve(auth2);
          });
        });
      }
      attachSignin() {
          this.googleInit().then( (auth2: any) => {
            let element = document.getElementById('btnGoogle');
            auth2.attachClickHandler( element, {}, (googleUser) => {

              let token = googleUser.getAuthResponse().id_token;

            this.usuarioService.loginGoogle(token)
            .subscribe(() => window.location.href =  '#/dashboard');

        });
      });
  }

  ingresar(forma: NgForm) {

    if ( forma.invalid ) {
      return;
    }

    let usuario = new Usuario(null, forma.value.email, forma.value.password);

    this.usuarioService.login(usuario, forma.value.recuerdame)
      .subscribe( correcto => this.router.navigate(['/dashboard']));
  }

}
