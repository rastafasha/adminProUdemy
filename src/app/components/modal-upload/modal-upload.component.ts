import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { SubirArchivoService } from '../../services/subirarchivo/subirarchivo.service';
import { ModalUploadService } from './modal-upload.service';

@Component({
  selector: 'app-modal-upload',
  templateUrl: './modal-upload.component.html',
  styleUrls: []
})
export class ModalUploadComponent implements OnInit {


  imagenSubir: File;
  imagenTemp: string | ArrayBuffer;

  constructor( 
    public subirArchivoService: SubirArchivoService,
    public modalUpladService: ModalUploadService
  ) { }

  ngOnInit() {
  }


  cerrarModal() {
    this.imagenTemp = null;
    this.imagenSubir = null;

    this.modalUpladService.ocultarModal();
  }


  seleccionImagen( archivo: File ) {
    // console.log(archivo);

    if (!archivo) {
      this.imagenSubir = null;
      return;
    }

    if( archivo.type.indexOf('image') <0 ) {
      // swal('Sólo Imagenes', 'El Archivo seleccionado no es una imagen', 'error');
      Swal.fire({
        title: 'Sólo Imagenes',
        text: 'El Archivo seleccionado no es una imagen',
        type: 'error',
        confirmButtonText: 'ok'
      });
      this.imagenSubir = null;
      return;
    }

    this.imagenSubir = archivo;

    let reader = new FileReader();
    let urlImagenTemp = reader.readAsDataURL( archivo);

    reader.onloadend = () => this.imagenTemp = reader.result;

  }

  subirImagen() {
    this.subirArchivoService.subirArchivo( this.imagenSubir, this.modalUpladService.tipo, this.modalUpladService.id)
    .then( resp => {

      this.modalUpladService.notificacion.emit(resp);
      this.cerrarModal();

    })
    .catch(err => {
      console.log('error en la carga...')
    });
  }

}
