import { Component, OnInit } from '@angular/core';
import { Medico } from 'src/app/models/medico.model';
import { MedicoService } from '../../services/service.index';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: []
})
export class MedicosComponent implements OnInit {

  medicos: Medico[] = [];
  desde: number = 0;
  totalMedicos: number = 0;

  constructor(
    public medicoService: MedicoService
  ) { }

  ngOnInit() {
    this.cargarMedicos();
  }

  cargarMedicos() {
    this.medicoService.cargarMedicos()
      .subscribe( medicos => this.medicos = medicos);


      this.medicoService.mostrarMedicos(this.desde)
      .subscribe( (resp: any) => {
        
        this.totalMedicos = resp.total;
        this.medicos = resp.medicos;

      });
  }

  crearMedico(){

  }

  buscarMedico( termino: string) {

    if ( termino.length <= 0) {
      this.cargarMedicos();
      return;
    }
    this.medicoService.buscarMedicos( termino )
      .subscribe( medicos => this.medicos = medicos);

  }

  actualizarImagen(){

  }

  guardarMedico(medico) {

  }

  borrarMedico(medico: Medico){
    this.medicoService.borrarMedico( medico._id)
    .subscribe( () => this.cargarMedicos() );

  }

  cabiarDesde( valor: number) {
    
    let desde = this.desde + valor;
    // console.log(desde);

    if (desde >= this.totalMedicos) {
      return;
    }
    if ( desde < 0 ) {
      return;
    }

    this.desde += valor;
    this.cargarMedicos();

  }

}
