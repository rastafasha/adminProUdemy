import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { UsuarioService } from '../usuario/usuario.service';
import { Hospital } from 'src/app/models/hospital.model';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class HospitalService {

  totalHospitales: number = 0;

  constructor( 
    public http: HttpClient,
    public usuarioService: UsuarioService
  ) { }

  cargarHospitales() {
    let url = URL_SERVICIOS + '/hospital';
    return this.http.get(url)
      .map((resp: any) => {
        this.totalHospitales = resp.total;
        return resp.hospitales;
      });
  }

  mostrarHospitales( desde: number = 0 ) {
  
    let url = URL_SERVICIOS + '/hospital?desde=' + desde;
    return this.http.get( url );

  }

  obtenerHospital(id: string) {
    let url = URL_SERVICIOS + '/hospital/' + id;
    return this.http.get(url)
      .map((resp: any) => resp.hospital);

  }

  borrarHospital(id:string) {
    let url = URL_SERVICIOS + '/hospital/' + id;
    url += '?token=' + this.usuarioService.token;

    return this.http.delete(url)
      .map( resp =>
        Swal.fire({
          title: 'Hospital Borrado!',
          text: 'Eliminado Correctamente',
          type: 'success',
          confirmButtonText: 'ok'
        })
        )
  }

  crearHospital( nombre: string) {
    let url = URL_SERVICIOS + '/hospital';
    url += '?token=' + this.usuarioService.token;

    return this.http.post( url, {nombre})
      .map((resp:any) => resp.hospital);

  }

  buscarHospital( termino: string) {

    let url = URL_SERVICIOS + '/busqueda/coleccion/hospitales/' + termino;
    return this.http.get( url )
      .map((resp: any) => resp.hospitales );

  }

  actualizarHospital( hospital: Hospital) {
    let url = URL_SERVICIOS + '/hospital/' + hospital._id;
    url += '?token=' + this.usuarioService.token;

    return this.http.put(url, hospital)
      .map( (resp: any) => {
        Swal.fire({
          title: 'Hospital Actualizado',
          text: hospital.nombre,
          type: 'success',
          confirmButtonText: 'ok'
        })
        return resp.hospital;
      });


  }

}
