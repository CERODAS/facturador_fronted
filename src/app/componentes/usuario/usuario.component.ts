import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { usuarioModel } from 'src/app/model/usuario-model';
import { UsuarioService } from 'src/app/service/usuario.service';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {

  listUsuario: usuarioModel[] = [];
  formUsuario: FormGroup = new FormGroup({});

  constructor(private usuarioService: UsuarioService){}

  ngOnInit(): void {
    this.list();
    this.formUsuario = new FormGroup({
      id_usuario: new FormControl(''),
      fk_rol: new FormControl(''),
      usuario: new FormControl(''),
      pass: new FormControl(''),
      nombre: new FormControl(''),
      telefono: new FormControl(''),
      correo: new FormControl(''),
      fecha_creacion: new FormControl(''),
      usuario_creacion: new FormControl(''),
      fecha_mod: new FormControl(''),
      usuario_mod: new FormControl(''),
      estado: new FormControl('')
    });
  }
 
  list(){
    this.usuarioService.getUsuario().subscribe(resp =>{
      if(resp){
        this.listUsuario = resp;
      }
    })
  }

  nuevoUsuario(){
    this.formUsuario.reset();
  }

  guardarUsuario(){
    if(this.formUsuario.value.estado == "1"){
      this.formUsuario.controls['estado'].setValue(true);
    }else if(this.formUsuario.value.estado == "0"){
      this.formUsuario.controls['estado'].setValue(false);
    }

    if(this.formUsuario.value.fk_rol == "1"){
      this.formUsuario.controls['fk_rol'].setValue(1);
    }else if(this.formUsuario.value.fk_rol == 0){
      this.formUsuario.controls['fk_rol'].setValue(2);
    }
    debugger;
    this.formUsuario.controls['fecha_creacion'].setValue('2023-09-16 01:11:04');
    this.formUsuario.controls['usuario_creacion'].setValue('admon');
    this.usuarioService.postUsuario(this.formUsuario.value).subscribe(resp =>{
      if(resp){
        this.list();
        this.formUsuario.reset();
      }
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

  actualizarUsuario(){
    if(this.formUsuario.value.estado == "1"){
      this.formUsuario.controls['estado'].setValue(true);
    }else if(this.formUsuario.value.estado == "0"){
      this.formUsuario.controls['estado'].setValue(false);
    }

    if(this.formUsuario.value.fk_rol == "1"){
      this.formUsuario.controls['fk_rol'].setValue(1);
    }else if(this.formUsuario.value.fk_rol == 0){
      this.formUsuario.controls['fk_rol'].setValue(2);
    }
    debugger;
    this.formUsuario.controls['fecha_creacion'].setValue('2023-09-16 01:11:04');
    this.formUsuario.controls['usuario_creacion'].setValue('admon');
    this.formUsuario.controls['fecha_mod'].setValue('2023-09-16 01:11:04');
    this.formUsuario.controls['usuario_mod'].setValue('admon');

    this.usuarioService.putUsuario(this.formUsuario.value).subscribe(resp =>{
      if(resp){
        this.list();
        this.formUsuario.reset();
      }
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
