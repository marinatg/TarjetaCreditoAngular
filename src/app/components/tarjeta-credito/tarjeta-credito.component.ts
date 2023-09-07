import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-tarjeta-credito',
  templateUrl: './tarjeta-credito.component.html',
  styleUrls: ['./tarjeta-credito.component.css']
})
export class TarjetaCreditoComponent implements OnInit {
  //variable tipo array vacio  
    listTarjetas: any[] = [ //le creo objetos dentro
      { titular: 'Valeria Sol', numeroTarjeta: '79900', fechaExpiracion: '11/23', cvv: '123' },
      { titular: 'Thiago Luna', numeroTarjeta: '557799', fechaExpiracion: '03/25', cvv: '111' },
      { titular: 'Mateo Nube', numeroTarjeta: '111000', fechaExpiracion: '14/27', cvv: '322' },
    ]; 

    form: FormGroup;

    constructor(private fb: FormBuilder, private toastr: ToastrService) { 
      this.form = this.fb.group({
        titular: ['', Validators.required],
        numeroTarjeta: ['', [Validators.required, Validators.pattern('^[0-9]{16}$')]],
        fechaExpiracion: ['', [Validators.required, Validators.pattern(/^(0[1-9]|1[0-2])\/([2-9][0-9])$/)]],
        cvv: ['', [Validators.required, Validators.pattern('^[0-9]{3}$')]],
      })

    }

    ngOnInit(): void {  
    }

    agregarTarjeta() {
      console.log(this.form)

      const tarjeta: any = {
        titular: this.form.get('titular')?.value,
        numeroTarjeta: this.form.get('numeroTarjeta')?.value,
        fechaExpiracion: this.form.get('fechaExpiracion')?.value,
        cvv: this.form.get('cvv')?.value,
      }

      this.listTarjetas.push(tarjeta);
      this.toastr.success('Datos guardados con éxito!', 'Tarjeta registrada.');

      this.form.reset();
    }

    eliminarTarjeta(index: number) {
      //Le indico que quiero eliminar, desde la posicion indice, un solo elemento
      this.listTarjetas.splice(index, 1);
      this.toastr.error('La tarjeta fue eliminada con exito!', 'Tarjeta eliminada:');
    }
}
