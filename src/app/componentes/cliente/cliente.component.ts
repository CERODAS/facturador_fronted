import { Component, OnInit } from '@angular/core';
import { clienteModel } from 'src/app/model/cliente-model';
import { ClienteService } from 'src/app/service/cliente.service';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent implements OnInit {

  listCliente: clienteModel[] = [];
  formCliente: FormGroup = new FormGroup({});

  constructor(private clienteService: ClienteService){}

  ngOnInit(): void {
    this.list();
    this.formCliente = new FormGroup({
      id_cliente: new FormControl(''),
      nombre: new FormControl(''),
      dpi: new FormControl(''),
      telefono: new FormControl(''),
      direccion: new FormControl(''),
      nit: new FormControl(''),
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
    this.formCliente.controls['fecha_creacion'].setValue('2023-09-16 01:11:04');
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
    
    this.formCliente.controls['fecha_creacion'].setValue('2023-09-16 01:11:04');
    this.formCliente.controls['usuario_creacion'].setValue('admon');
    this.formCliente.controls['fecha_mod'].setValue('2023-09-16 01:11:04');
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
    this.clienteService.deleteCliente(this.formCliente.value).subscribe(resp =>{
      if(resp){
        this.list();
        this.formCliente.reset();
      }
    });
  }
}
