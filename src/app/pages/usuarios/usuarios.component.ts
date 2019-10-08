import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from '../../services/service.index';
import Swal from 'sweetalert2';
import { subscribeOn } from 'rxjs/operators';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';



@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: []
})
export class UsuariosComponent implements OnInit {

  usuarios: Usuario[] = [];
  desde: number = 0;

  totalRegistros: number = 0;
  cargando: boolean = true;

  constructor(
    public usuarioService: UsuarioService,
    public modalUploadService: ModalUploadService
  ) { }

  ngOnInit() {
    this.cargarUsuarios();

    this.modalUploadService.notificacion
      .subscribe( (resp: any) => this.cargarUsuarios() );
  }

  mostrarModal( id: string) {
    this.modalUploadService.mostrarModal('usuarios', id);
  }

  cargarUsuarios() {

    this.cargando = true;

    this.usuarioService.cargarUsuarios(this.desde)
      .subscribe( (resp: any) => {

        // console.log(resp);
        this.totalRegistros = resp.total;
        this.usuarios = resp.usuarios;
        this.cargando = false;

      });
  
  }
  cabiarDesde( valor: number) {
    
    let desde = this.desde + valor;
    // console.log(desde);

    if (desde >= this.totalRegistros) {
      return;
    }
    if ( desde < 0 ) {
      return;
    }

    this.desde += valor;
    this.cargarUsuarios();

  }

  buscarUsuario( termino: string) {
    // console.log(termino);
    if (termino.length <= 0) {
      this.cargarUsuarios();
      return;
    }

    this.cargando = true;

    this.usuarioService.buscarUsuario(termino)
      .subscribe( (usuarios: Usuario[]) => {

        this.usuarios = usuarios;
        this.cargando = false;

      });
  }

  borrarUsuario( usuario: Usuario ) {
    if ( usuario._id === this.usuarioService.usuario._id ) { // id logueado actualmente
      Swal.fire({
        title: 'No puede borrar usuario',
        text: 'No se puede borrar a si mismo',
        type: 'error',
        confirmButtonText: 'ok'
      });
      return;

    }

    Swal.fire({
      title: 'Estas seguro?',
      text: 'Estas a punto de borrar a ' + usuario.nombre,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Borrarlo!'
    }).then(borrar => {
      if (borrar) {
        
        this.usuarioService.borrarUsuario( usuario._id)
          .subscribe( borrado => {
            
              console.log(borrado);
              this.cargarUsuarios();

          });

      }
    })
  }

  guardarUsuario( usuario: Usuario ) {
    this.usuarioService.actualizarUsuario( usuario)
      .subscribe();
  }

}
