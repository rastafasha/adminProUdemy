import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from '../../services/service.index';
<<<<<<< HEAD
import swal from 'sweetalert';
=======
import Swal from 'sweetalert2';
>>>>>>> arrelgo de sweetalert-mantenimiento usuarios

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: []
})
export class ProfileComponent implements OnInit {

  usuario: Usuario;

  imagenSubir: File;
<<<<<<< HEAD

=======
>>>>>>> arrelgo de sweetalert-mantenimiento usuarios
  imagenTemp: string | ArrayBuffer;

  constructor(
    public usuarioService: UsuarioService
  ) {
    this.usuario = this.usuarioService.usuario;
  }

  ngOnInit() {
  }

  guardar( usuario: Usuario) {
    this.usuario.nombre = usuario.nombre;
    if ( !this.usuario.google) {
      this.usuario.email = usuario.email;
    }
    this.usuarioService.actualizarUsuario( this.usuario)
      .subscribe();
  }

  seleccionImagen( archivo: File ) {
    // console.log(archivo);

    if (!archivo) {
      this.imagenSubir = null;
      return;
    }

    if( archivo.type.indexOf('image') <0 ) {
<<<<<<< HEAD
      swal('Sólo Imagenes', 'El Archivo seleccionado no es una imagen', 'error');
=======
      // swal('Sólo Imagenes', 'El Archivo seleccionado no es una imagen', 'error');
      Swal.fire({
        title: 'Sólo Imagenes',
        text: 'El Archivo seleccionado no es una imagen',
        type: 'error',
        confirmButtonText: 'ok'
      });
>>>>>>> arrelgo de sweetalert-mantenimiento usuarios
      this.imagenSubir = null;
      return;
    }

    this.imagenSubir = archivo;

    let reader = new FileReader();
    let urlImagenTemp = reader.readAsDataURL( archivo);

    reader.onloadend = () => this.imagenTemp = reader.result;

  }
  cambiarImagen() {
    this.usuarioService.cambiarImagen( this.imagenSubir, this.usuario._id);
  }

}
