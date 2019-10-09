import { Component, OnInit } from '@angular/core';
import { Hospital } from 'src/app/models/hospital.model';
import { HospitalService } from '../../services/service.index';
import Swal from 'sweetalert2';
import { ModalUploadService } from 'src/app/components/modal-upload/modal-upload.service';

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: []
})
export class HospitalesComponent implements OnInit {
  hospitales: Hospital[] = [];
  
  desde: number = 0;
  totalHospitales: number = 0;

  constructor(
    public hospitalService: HospitalService,
    public modalUploadService: ModalUploadService
  ) { }

  ngOnInit() {
    this.cargarHospitales();

    this.modalUploadService.notificacion
      .subscribe( () => this.cargarHospitales());
  }

  cargarHospitales() {
    this.hospitalService.cargarHospitales()
      .subscribe(hospitales => this.hospitales = hospitales);

      this.hospitalService.mostrarHospitales(this.desde)
      .subscribe( (resp: any) => {
        
        this.totalHospitales = resp.total;
        this.hospitales = resp.hospitales;

      });
  }

  guardarHospital( hospital: Hospital) {
    this.hospitalService.actualizarHospital(hospital)
      .subscribe();

  }

  

  buscarHospital( termino: string) {
    if (termino.length <= 0) {
      this.cargarHospitales();
      return;
    }

    this.hospitalService.buscarHospital(termino)
      .subscribe(hospitales => this.hospitales = hospitales);
  }

  borrarHospital(hospital: Hospital) {
    this.hospitalService.borrarHospital(hospital._id)
      .subscribe( () => this.cargarHospitales() );
  }

  crearHospital() {
    Swal.fire({
      title: 'Crear Hospital',
      text: 'Ingrese el nombre del hospital',
      input: 'text',
      showCancelButton: true,
      type: 'warning',
      confirmButtonText: 'ok'
    }).then(valor => {
      if(!valor.value || valor.value.length === 0) {
        return;
      }
      this.hospitalService.crearHospital(valor.value)
        .subscribe( () => this.cargarHospitales());
    
    });
  }

  actualizarImagen( hospital: Hospital ) {
    this.modalUploadService.mostrarModal('hospitales', hospital._id );
  }

  cabiarDesde( valor: number) {
    
    let desde = this.desde + valor;
    // console.log(desde);

    if (desde >= this.totalHospitales) {
      return;
    }
    if ( desde < 0 ) {
      return;
    }

    this.desde += valor;
    this.cargarHospitales();

  }

}
