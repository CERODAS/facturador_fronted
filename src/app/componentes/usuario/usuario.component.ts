import { Component, OnInit,Injectable  } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { usuarioModel } from 'src/app/model/usuario-model';
import { UsuarioService } from 'src/app/service/usuario.service';
import { rolesModel } from 'src/app/model/roles-model';
import { RolesService } from 'src/app/service/roles.service';
import * as crypto from 'crypto-js';


@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})

@Injectable({
  providedIn: 'root'
})

export class UsuarioComponent implements OnInit {

  listUsuario: usuarioModel[] = [];
  roles: rolesModel[] = [];
  formUsuario: FormGroup = new FormGroup({});
  

  constructor(private usuarioService: UsuarioService, private rolesServices: RolesService){}
  cifrarPass(pass: string): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      // Convierte la contraseña ingresada a SHA-1
      const hashedPass = crypto.SHA1(pass).toString();
      resolve(hashedPass);
    });
  }
  
    // Propiedades para mensajes de error
    nombreError: string = '';
    costoError: string = '';
    unidadesError: string = '';
    isFormValid: boolean = true; 

  ngOnInit(): void {
    this.list();
    this.loadRoles();
    this.formUsuario = new FormGroup({
      id_usuario: new FormControl(''),
      fk_rol: new FormControl(''),
      usuario: new FormControl('',[
        Validators.required,
        Validators.pattern(/^.{4,8}$/)
      ]),
      pass: new FormControl(''),
      nombre: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[a-zA-Z]+( [a-zA-Z]+)*$/)
      ]),
      telefono: new FormControl('',[
        Validators.required,
        Validators.pattern(/^[0-9]{8}$/)
      ]),
      correo: new FormControl('',[
        Validators.required,
        Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
      ]),
      fecha_creacion: new FormControl(''),
      usuario_creacion: new FormControl(''),
      fecha_mod: new FormControl(''),
      usuario_mod: new FormControl(''),
      estado: new FormControl(''),
      rol: new FormControl('', Validators.required)
    });
  }
 
  list(){
    this.usuarioService.getUsuario().subscribe(resp =>{
      if(resp){
        this.listUsuario = resp;
      }
    })
  }

  loadRoles() {
    this.rolesServices.getRoles().subscribe(resp => {
      if (resp) {
        this.roles = resp;
      }
    });
  }

  onUsuarioBlur() {
    const usuarioControl = this.formUsuario.get('usuario');
    if (usuarioControl && usuarioControl.hasError('pattern')) {
      this.formUsuario.controls['usuario'].setErrors({ 'pattern': true });
      this.isFormValid = false; // Marcar el formulario como inválido
    } else {
      this.isFormValid = true; // Marcar el formulario como válido
    }
  }


  onNombreBlur() {
    const nombreControl = this.formUsuario.get('nombre');
    if (nombreControl && nombreControl.hasError('pattern')) {
      this.formUsuario.controls['nombre'].setErrors({ 'pattern': true });
      this.isFormValid = false; // Marcar el formulario como inválido
    } else {
      this.isFormValid = true; // Marcar el formulario como válido
    }
  }

  onTelefonoBlur() {
    const telefonoControl = this.formUsuario.get('telefono');
    if (telefonoControl && telefonoControl.hasError('pattern')) {
      this.formUsuario.controls['telefono'].setErrors({ 'pattern': true });
      this.isFormValid = false; // Marcar el formulario como inválido
    } else {
      this.isFormValid = true; // Marcar el formulario como válido
    }
  }

  onCorreoBlur() {
    const correoControl = this.formUsuario.get('correo');
    if (correoControl && correoControl.hasError('pattern')) {
      this.formUsuario.controls['correo'].setErrors({ 'pattern': true });
      this.isFormValid = false; // Marcar el formulario como inválido
    } else {
      this.isFormValid = true; // Marcar el formulario como válido
    }
  }

  

  resetField(fieldName: string) {
    this.formUsuario.controls[fieldName].setErrors(null);
  }
  
  clearField(fieldName: string) {
    this.formUsuario.get(fieldName)?.setValue(''); // Establece el valor del campo en blanco
  }
  
  
  nuevoUsuario(){
    this.formUsuario.reset();
  }

  guardarUsuario() {
    if (this.formUsuario.value.estado == "1") {
      this.formUsuario.controls['estado'].setValue(true);
    } else if (this.formUsuario.value.estado == "0") {
      this.formUsuario.controls['estado'].setValue(false);
    }
  
    if (this.formUsuario.value.fk_rol == "1") {
      this.formUsuario.controls['fk_rol'].setValue(1);
    } else if (this.formUsuario.value.fk_rol == 0) {
      this.formUsuario.controls['fk_rol'].setValue(2);
    }
    const fechaActual = new Date();
    const fechaFormateada = fechaActual.toISOString().slice(0, 19).replace('T', ' ');
  
    // Espera la resolución de la promesa antes de asignar el valor
    this.cifrarPass(this.formUsuario.value.pass.toString())
      .then((hashedPass: string) => {
        this.formUsuario.controls['fecha_creacion'].setValue(fechaFormateada);
        this.formUsuario.controls['usuario_creacion'].setValue('admon');
        this.formUsuario.controls['pass'].setValue(hashedPass);
  
        this.usuarioService.postUsuario(this.formUsuario.value).subscribe(resp => {
          if (resp) {
            this.list();
            this.formUsuario.reset();
          }
        });
      });
  }

  selectUsuario(item: any){
    this.formUsuario.controls['id_usuario'].setValue(item.id_usuario);
    this.formUsuario.controls['usuario'].setValue(item.usuario);
    this.formUsuario.controls['pass'].setValue(item.pass);
    this.formUsuario.controls['correo'].setValue(item.correo);
    this.formUsuario.controls['nombre'].setValue(item.nombre);
    this.formUsuario.controls['telefono'].setValue(item.telefono);
    if(item.estado == 1){
      this.formUsuario.controls['estado'].setValue(1);
    }else{
      this.formUsuario.controls['estado'].setValue(0);
    }
  }
  actualizarUsuario() {
    if (this.formUsuario.value.estado == "1") {
      this.formUsuario.controls['estado'].setValue(true);
    } else if (this.formUsuario.value.estado == "0") {
      this.formUsuario.controls['estado'].setValue(false);
    }
  
    if (this.formUsuario.value.fk_rol == "1") {
      this.formUsuario.controls['fk_rol'].setValue(1);
    } else if (this.formUsuario.value.fk_rol == 0) {
      this.formUsuario.controls['fk_rol'].setValue(2);
    }
    const fechaActual = new Date();
    const fechaFormateada = fechaActual.toISOString().slice(0, 19).replace('T', ' ');
  
    // Espera la resolución de la promesa antes de asignar el valor
    this.cifrarPass(this.formUsuario.value.pass.toString())
      .then((hashedPass: string) => {
        this.formUsuario.controls['fecha_creacion'].setValue(fechaFormateada);
        this.formUsuario.controls['usuario_creacion'].setValue('admon');
        this.formUsuario.controls['fecha_mod'].setValue(fechaFormateada);
        this.formUsuario.controls['usuario_mod'].setValue('admon');
        this.formUsuario.controls['pass'].setValue(hashedPass);
  
        this.usuarioService.putUsuario(this.formUsuario.value).subscribe(resp => {
          if (resp) {
            this.list();
            this.formUsuario.reset();
          }
        });
      });
    }

  selectDeleteUsuario(item: any){
    this.formUsuario.controls['usuario'].setValue(item.usuario);
    this.formUsuario.controls['id_usuario'].setValue(item.id_usuario);
  }

  eliminarUsuario(){
    this.usuarioService.deleteUsuario(this.formUsuario.value).subscribe(resp =>{
      if(resp){
        debugger;
        this.list();
        this.formUsuario.reset();
      }
    });
  }
}
