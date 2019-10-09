import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { UsuarioService } from '../usuario/usuario.service';
import { Medico } from 'src/app/models/medico.model';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class MedicoService {

  totalMedicos: number = 0;

  constructor(
    public http: HttpClient,
    public usuarioService: UsuarioService
  ) { }

  cargarMedicos() {
    let url = URL_SERVICIOS + '/medico';

    return this.http.get(url)
      .map( (resp: any ) => {

        this.totalMedicos = resp.total;
        return resp.medicos;

      })
  }
  mostrarMedicos( desde: number = 0 ) {
  
    let url = URL_SERVICIOS + '/medico?desde=' + desde;
    return this.http.get( url );

  }

  cargarMedico( id: string) {
    let url = URL_SERVICIOS + '/medico/' + id;
    return this.http.get(url)
      .map( (resp: any) => resp.medico);
  }

  buscarMedicos( termino: string) {
    
    let url = URL_SERVICIOS + '/busqueda/coleccion/medicos/' + termino;
    return this.http.get( url )
      .map((resp: any) => resp.medicos );

  }

  borrarMedico( id: string) {
    let url = URL_SERVICIOS + '/medico/' + id;
    url += '?token=' + this.usuarioService.token;

    return this.http.delete(url)
    .map( resp =>
      Swal.fire({
        title: 'Medico Borrado!',
        text: 'Medico borrado correctamente',
        type: 'success',
        confirmButtonText: 'ok'
      })
      )
  }

  guardarMedico(medico: Medico) {

    let url = URL_SERVICIOS + '/medico';

    if( medico._id) {
      // actualizando
      url += '/' + medico._id;
      url += '?token=' + this.usuarioService.token;

      return this.http.put(url, medico)
        .map( (resp: any) => {

          Swal.fire({
            title: 'Medico Actualizado!',
            text: medico.nombre,
            type: 'success',
            confirmButtonText: 'ok'
          })

          return resp.medico;

        })
      

    } else {
      // creando
    url += '?token=' + this.usuarioService.token;

    return this.http.post(url, medico )
      .map( (resp: any) => {

        Swal.fire({
          title: 'Medico Creado!',
          text: medico.nombre,
          type: 'success',
          confirmButtonText: 'ok'
        })

        return resp.medico;
      })
    }

    

  }
}
