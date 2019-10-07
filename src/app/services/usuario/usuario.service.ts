import { Injectable } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import 'rxjs/add/operator/map';
import { Router } from '@angular/router';
import { SubirArchivoService } from '../subirarchivo/subirarchivo.service';

import _swal from 'sweetalert';
import { SweetAlert } from 'sweetalert/typings/core';



const swal: SweetAlert = _swal as any;


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  usuario: Usuario;
  token: string;

  constructor(
    public http: HttpClient,
    public router: Router,
    public subirArchivoService: SubirArchivoService
  ) {
    this.cargarStorage();
   }

   estaLogueado() {
     return (this.token.length > 5) ? true : false;
   }

   cargarStorage() {
     if (localStorage.getItem('token')) {
       this.token = localStorage.getItem('token');
       this.usuario = JSON.parse (localStorage.getItem('usuario'));
     } else {
       this.token = '';
       this.usuario = null;
     }
   }

   guardarStorage( id: string, token: string, usuario: Usuario) {

    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(usuario));

    this.usuario = usuario;
    this.token = token;

   }

   actualizarUsuario( usuario: Usuario) {

      let url = URL_SERVICIOS + '/usuario/' + usuario._id;
      url += '?token=' + this.token;

      // console.log(url);

      return this.http.put(url, usuario)
        .map( (resp: any) => {
          // this.usuario = resp.usuario;
          // tslint:disable-next-line:prefer-const
          let usuarioDB: Usuario = resp.usuario;

          this.guardarStorage( usuarioDB._id, this.token, usuarioDB );
          swal('Usuario Actualizado', usuario.nombre, 'success');

          return true;
        });

   }

   logout() {
     this.usuario = null;
     this.token = '';

     localStorage.removeItem('token');
     localStorage.removeItem('usuario');

     this.router.navigate(['/login']);

   }


   loginGoogle( token: string) {
      let url = URL_SERVICIOS + '/login/google';

      return this.http.post( url, { token })
        .map( (resp: any) => {
          this.guardarStorage(resp.id, resp.token, resp.usuario);
          return true;
        });
   }

  login( usuario: Usuario, recuerdame: boolean = false) {

    if ( recuerdame) {
      localStorage.setItem('email', usuario.email);
    } else {
      localStorage.removeItem('email');
    }

    let url = URL_SERVICIOS + '/login';
    return this.http.post(url, usuario)
      .map((resp: any) => {
        this.guardarStorage(resp.id, resp.token, resp.usuario);

        return true;
      });


  }

  crearUsuario( usuario: Usuario) {

    let url = URL_SERVICIOS + '/usuario';

    return this.http.post( url, usuario )
      .map( (resp: any) => {

        swal('Usuario creado', usuario.email, 'success');
        return resp.usuario;

      });

  }

  cambiarImagen( archivo: File, id: string) {
    this.subirArchivoService.subirArchivo( archivo, 'usuarios', id)
      .then((resp: any) => {
        this.usuario.img = resp.usuario.img;
        swal('Imagen Actualizada', this.usuario.nombre, 'success');
        this.guardarStorage(id, this.token, this.usuario);
      })
      .catch( resp => {
        console.log(resp);
      });

  }


}
