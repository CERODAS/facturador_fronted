import { Component, OnInit } from '@angular/core';
import { clienteModel } from 'src/app/model/cliente-model';
import { ClienteService } from 'src/app/service/cliente.service';
import { FormGroup, FormControl,Validators } from '@angular/forms';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent implements OnInit {

  listCliente: clienteModel[] = [];
  formCliente: FormGroup = new FormGroup({});

  constructor(private clienteService: ClienteService){}

    // Propiedades para mensajes de error
    nombreError: string = '';
    costoError: string = '';
    unidadesError: string = '';
    isFormValid: boolean = true; 

  ngOnInit(): void {
    this.list();
    this.formCliente = new FormGroup({
      id_cliente: new FormControl(''),
      nombre: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[a-zA-Z]+( [a-zA-Z]+)*$/)
      ]),
      dpi: new FormControl('',[
        Validators.required,
        Validators.pattern(/^[0-9]{13}$/)
      ]),
      telefono: new FormControl('',[
        Validators.required,
        Validators.pattern(/^[0-9]{8}$/)
      ]),
      direccion: new FormControl('',[]),
      nit: new FormControl('',[
        Validators.required,
        Validators.pattern(/^[a-zA-Z0-9]{6,13}$/)
      ]),
      fecha_creacion: new FormControl(''),
      usuario_creacion: new FormControl(''),
      fecha_mod: new FormControl(''),
      usuario_mod: new FormControl(''),
      estado: new FormControl('')
    });
  }

  list(){
    this.clienteService.getCliente().subscribe(resp =>{
      if(resp){
        this.listCliente = resp;
      }
    })
  }

  onNombreBlur() {
    const nombreControl = this.formCliente.get('nombre');
    if (nombreControl && nombreControl.hasError('pattern')) {
      this.formCliente.controls['nombre'].setErrors({ 'pattern': true });
      this.isFormValid = false; // Marcar el formulario como inválido
    } else {
      this.isFormValid = true; // Marcar el formulario como válido
    }
  }

  onDpiBlur() {
    const dpiControl = this.formCliente.get('dpi');
    if (dpiControl && dpiControl.hasError('pattern')) {
      this.formCliente.controls['dpi'].setErrors({ 'pattern': true });
      this.isFormValid = false; // Marcar el formulario como inválido
    } else {
      this.isFormValid = true; // Marcar el formulario como válido
    }
  }

  onTelefonoBlur() {
    const telefonoControl = this.formCliente.get('telefono');
    if (telefonoControl && telefonoControl.hasError('pattern')) {
      this.formCliente.controls['telefono'].setErrors({ 'pattern': true });
      this.isFormValid = false; // Marcar el formulario como inválido
    } else {
      this.isFormValid = true; // Marcar el formulario como válido
    }
  }

  
  onNitBlur() {
    const nitControl = this.formCliente.get('nit');
    if (nitControl && nitControl.hasError('pattern')) {
      this.formCliente.controls['nit'].setErrors({ 'pattern': true });
      this.isFormValid = false; // Marcar el formulario como inválido
    } else {
      this.isFormValid = true; // Marcar el formulario como válido
    }
  }


  resetField(fieldName: string) {
    this.formCliente.controls[fieldName].setErrors(null);
  }
  
  clearField(fieldName: string) {
    this.formCliente.get(fieldName)?.setValue(''); // Establece el valor del campo en blanco
  }
  
  nuevoCliente(){
    this.formCliente.reset();
  }

  selectCliente(item: any){
    this.formCliente.controls['id_cliente'].setValue(item.id_cliente);
    this.formCliente.controls['nombre'].setValue(item.nombre);
    this.formCliente.controls['dpi'].setValue(item.dpi);
    this.formCliente.controls['telefono'].setValue(item.telefono);
    this.formCliente.controls['direccion'].setValue(item.direccion);
    this.formCliente.controls['nit'].setValue(item.nit);
    if(item.estado == true){
      this.formCliente.controls['estado'].setValue(1);
    }else{
      this.formCliente.controls['estado'].setValue(0);
    }
  }

  guardarCliente(){
    if(this.formCliente.value.estado == "1"){
      this.formCliente.controls['estado'].setValue(true);
    }else if(this.formCliente.value.estado == "0"){
      this.formCliente.controls['estado'].setValue(false);
    }
    const fechaActual = new Date(); 
    const fechaFormateada = fechaActual.toISOString().slice(0, 19).replace('T', ' ');

    this.formCliente.controls['fecha_creacion'].setValue(fechaFormateada);
    this.formCliente.controls['usuario_creacion'].setValue('admon');
    this.clienteService.postCliente(this.formCliente.value).subscribe(resp =>{
      if(resp){
        this.list();
        this.formCliente.reset();
      }
    });
  }

  actualizarCliente(){
    if(this.formCliente.value.estado == "1"){
      this.formCliente.controls['estado'].setValue(true);
    }else if(this.formCliente.value.estado == "0"){
      this.formCliente.controls['estado'].setValue(false);
    }
    
    const fechaActual = new Date(); 
    const fechaFormateada = fechaActual.toISOString().slice(0, 19).replace('T', ' ');

    this.formCliente.controls['fecha_creacion'].setValue(fechaFormateada);
    this.formCliente.controls['usuario_creacion'].setValue('admon');
    this.formCliente.controls['fecha_mod'].setValue(fechaFormateada);
    this.formCliente.controls['usuario_mod'].setValue('admon');
    this.clienteService.putCliente(this.formCliente.value).subscribe(resp =>{
      if(resp){
        this.list();
        this.formCliente.reset();
      }
    });
  }

  selectDeleteCliente(item: any){
    this.formCliente.controls['nombre'].setValue(item.nombre);
    this.formCliente.controls['id_cliente'].setValue(item.id_cliente);
  }

  eliminarCliente(){
  const fechaActual = new Date();
  const fechaFormateada = fechaActual.toString().slice(0.19).replace('T',' ');

    this.formCliente.controls['estado'].setValue(false);
    this.formCliente.controls['fecha_creacion'].setValue(fechaFormateada);
    this.formCliente.controls['usuario_creacion'].setValue('admon');
    this.formCliente.controls['fecha_mod'].setValue(fechaFormateada);
    this.formCliente.controls['usuario_mod'].setValue('admon');
    this.clienteService.deleteCliente(this.formCliente.value).subscribe(resp =>{
      if(resp){
        this.list();
        this.formCliente.reset();
      }
    });
  }
}
