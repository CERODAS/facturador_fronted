import { Component, OnInit } from '@angular/core';
import { LoginService } from './login.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import * as crypto from 'crypto-js';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  nombreUsuario: string = '';
  claveUsuario: string = '';
  
  constructor(
    private loginService: LoginService,
    private router: Router,
  ) {}

  ngOnInit() {
    
  }
  
  onSubmit() {
    this.loginService
      .getUsuarioByNombre(this.nombreUsuario)
      .subscribe((usuario) => {
        if (usuario) {
          // Imprime en la consola los datos para verificar la comparación
          console.log('Datos del usuario recuperado:', usuario.usuario);
          console.log('Datos del usuario recuperado:', usuario.pass);

          console.log('Nombre de usuario ingresado:', this.nombreUsuario);

          // Convierte la contraseña ingresada a SHA-1
          const hashedClaveUsuario = crypto.SHA1(this.claveUsuario).toString();
          console.log('Contraseña ingresada (SHA-1):', hashedClaveUsuario);

          if (
            usuario.usuario === this.nombreUsuario &&
            usuario.pass === hashedClaveUsuario
          ) {
            // Las credenciales son correctas, redirige al componente de inicio
            this.router.navigate(['cliente']);
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Lo siento',
              text: 'Los datos ingresados son incorrectos',
            });
          }
        }
      });
  }
}
