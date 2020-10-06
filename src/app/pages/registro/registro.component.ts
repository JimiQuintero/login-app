import { Component, OnInit } from '@angular/core';
import { UsuarioModelo } from 'src/app/models/usuario.model';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

// SweetAlert2
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  usuario: UsuarioModelo;
  recordarme = false;


  constructor(private auth: AuthService, 
              private router: Router ) { }

  ngOnInit() {
    this.usuario = new UsuarioModelo();
   }

   onSubmit(form: NgForm) {

    if (form.invalid) { return; }

    Swal.fire({
      allowOutsideClick: false,
      // title: 'Error!',
      text: 'Espere por favor...',
      icon: 'info',
      confirmButtonText: 'Ok'
    });

    this.auth.nuevoUsuario( this.usuario).subscribe( resp => {
      console.log(resp);

      Swal.close();

      if (this.recordarme) {
        localStorage.setItem('email', this.usuario.email);
      }

      this.router.navigateByUrl('/home');
    }, (err) => {
      console.log(err.error.error.message);

      Swal.fire({
        // allowOutsideClick: false,
        title: 'Error! al autenticar',
        text: err.error.error.message,
        icon: 'error',
        confirmButtonText: 'Ok'
      });

    });
   }


}
