import { Injectable } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';


import { Router } from '@angular/router';
import { SubirArchivoService } from '../subirarchivo/subirarchivo.service';

import Swal from 'sweetalert2';

// rxjs
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs';
import { filter, catchError, mergeMap } from 'rxjs/operators';
import { throwError} from 'rxjs/internal/observable/throwError';



@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  usuario: Usuario;
  token: string;
  menu: any = [];

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
       this.menu = JSON.parse (localStorage.getItem('menu'));
       
     } else {
       this.token = '';
       this.usuario = null;
       this.menu = [];
     }
   }

   guardarStorage( id: string, token: string, usuario: Usuario, menu: any) {

    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(usuario));
    localStorage.setItem('menu', JSON.stringify(menu));

    this.usuario = usuario;
    this.token = token;
    this.menu = menu;
    

   }

   

   logout() {
     this.usuario = null;
     this.token = '';
     this.menu = [];

     localStorage.removeItem('token');
     localStorage.removeItem('usuario');
     localStorage.removeItem('menu');

     this.router.navigate(['/login']);

   }


   loginGoogle( token: string) {
      let url = URL_SERVICIOS + '/login/google';

      return this.http.post( url, { token })
        .map( (resp: any) => {
          this.guardarStorage(resp.id, resp.token, resp.usuario, resp.menu);
          console.log(resp);
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
        this.guardarStorage(resp.id, resp.token, resp.usuario, resp.menu);
        return true;
      })
      .catch(err => {
        Swal.fire({
          title: 'Error en el Login',
          text: err.error.mensaje,
          type: 'error',
          confirmButtonText: 'ok'
        });

        return Observable.throw(err);
        
      })


  }

  actualizarUsuario( usuario: Usuario) {

    let url = URL_SERVICIOS + '/usuario/' + usuario._id;
    url += '?token=' + this.token;

    // console.log(url);

    return this.http.put(url, usuario)
      .map( (resp: any) => {
        
        if ( usuario._id === this.usuario._id) {
          
          let usuarioDB: Usuario = resp.usuario;
          this.guardarStorage( usuarioDB._id, this.token, usuarioDB, resp.menu );
          
        }
        Swal.fire({
          title: 'Usuario Actualizado',
          text: usuario.nombre,
          type: 'success',
          confirmButtonText: 'ok'
        });
        return true;
      })
      .catch(err =>{
        Swal.fire({
          title: err.error.mensaje,
          text: err.error.errors.message,
          type: 'error',
          confirmButtonText: 'ok'
        });
        return Observable.throw(err);
      })
      

 }

  crearUsuario( usuario: Usuario) {

    let url = URL_SERVICIOS + '/usuario';

    return this.http.post( url, usuario )
      .map( (resp: any) => {
        // swal('Usuario creado', usuario.email, 'success');
        Swal.fire({
          title: 'Usuario Creado',
          text: usuario.email,
          type: 'success',
          confirmButtonText: 'ok'
        })
        return resp.usuario;
      })
      .catch(err => {
        Swal.fire({
          title: err.error.mensaje,
          text: err.error.errors.message,
          type: 'error',
          confirmButtonText: 'ok'
        });
        
        return Observable.throw(err);
        
      })

  }

  cambiarImagen( archivo: File, id: string) {
    this.subirArchivoService.subirArchivo( archivo, 'usuarios', id)
      .then((resp: any) => {
        this.usuario.img = resp.usuario.img;
        // swal('Imagen Actualizada', this.usuario.nombre, 'success');
        Swal.fire({
          title: 'Imagen Actualizada',
          text: this.usuario.nombre,
          type: 'success',
          confirmButtonText: 'ok'
        });
        this.guardarStorage(id, this.token, this.usuario, this.menu);
      })
      .catch( resp => {
        console.log(resp);
      });

  }

  cargarUsuarios( desde: number = 0 ) {
  
    let url = URL_SERVICIOS + '/usuario?desde=' + desde;
    return this.http.get( url );

  }

  buscarUsuario( termino: string) {
    
    let url = URL_SERVICIOS + '/busqueda/coleccion/usuarios/' + termino;
    return this.http.get( url )
      .map((resp: any) => resp.usuarios );

  }
  
  borrarUsuario( id: string) {
    
    let url = URL_SERVICIOS + '/usuario/' + id;
    url += '?token=' + this.token;
    
    return this.http.delete( url )
      .map( resp => {
        Swal.fire({
          title: 'Usuario Eliminado',
          text: 'El usuario ha sido eliminado correctamente',
          type: 'success',
          confirmButtonText: 'ok'
        });
        return true;
      });

  }


}
