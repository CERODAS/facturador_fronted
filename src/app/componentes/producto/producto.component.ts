import { Component, OnInit } from '@angular/core';
import { productoModel } from 'src/app/model/producto.model';
import { ProductoService } from 'src/app/service/producto.service';
import { FormGroup, FormControl,Validators  } from '@angular/forms';
import { CategoriaService } from 'src/app/service/categoria.service';

import { CategoriaModel } from 'src/app/model/categoria.model';


@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements OnInit {

  listProducto: productoModel[] = [];
  categorias: CategoriaModel[] = [];
  formProducto: FormGroup = new FormGroup({});

  constructor(private productoService: ProductoService,private categoriaService: CategoriaService) { }

  // Propiedades para mensajes de error
  nombreError: string = '';
  costoError: string = '';
  unidadesError: string = '';
  isFormValid: boolean = true; 

  
  
  ngOnInit(): void {
    this.list();
    this.cargarCategorias();
    this.formProducto  = new FormGroup({
      id_producto: new FormControl(''),
      fk_categoria: new FormControl(''),
      nombre: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[a-zA-Z0-9]+( [a-zA-Z0-9]+)*$/)
      ]),
      costo: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[1-9]\d*$/)
      ]),
      
      unidades: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[1-9]\d*$/)
      ]),
      fecha_creacion: new FormControl(''),
      usuario_creacion: new FormControl(''),
      fecha_mod: new FormControl(''),
      usuario_mod: new FormControl(''),
      estado: new FormControl('')
      
    });

  }
  list(){
    this.productoService.getProducto().subscribe(resp =>{
      if(resp){
        this.listProducto = resp;
      }
    })
  }
  
  cargarCategorias() {
    this.categoriaService.getCatetoria().subscribe(categorias => {
      this.categorias = categorias;
    });
  }
// Funciones para validar y mostrar mensajes de error


onNombreBlur() {
  const nombreControl = this.formProducto.get('nombre');
  if (nombreControl && nombreControl.hasError('pattern')) {
    this.formProducto.controls['nombre'].setErrors({ 'pattern': true });
    this.isFormValid = false; // Marcar el formulario como inválido
  } else {
    this.isFormValid = true; // Marcar el formulario como válido
  }
}

onCostoBlur() {
  const costoControl = this.formProducto.get('costo');
  if (costoControl && costoControl.hasError('pattern')) {
    this.formProducto.controls['costo'].setErrors({ 'pattern': true });
    this.isFormValid = false; // Marcar el formulario como inválido
  } else {
    this.isFormValid = true; // Marcar el formulario como válido
  }
}

onUnidadesBlur() {
  const unidadesControl = this.formProducto.get('unidades');
  if (unidadesControl && unidadesControl.hasError('pattern')) {
    this.formProducto.controls['unidades'].setErrors({ 'pattern': true });
    this.isFormValid = false; // Marcar el formulario como inválido
  } else {
    this.isFormValid = true; // Marcar el formulario como válido
  }
}


resetField(fieldName: string) {
  this.formProducto.controls[fieldName].setErrors(null);
}

clearField(fieldName: string) {
  this.formProducto.get(fieldName)?.setValue(''); // Establece el valor del campo en blanco
}


  nuevoProducto(){
    this.formProducto.reset();
  }

  
  selectProducto(item: any){
    this.formProducto.controls['id_producto'].setValue(item.id_producto);
    this.formProducto.controls['fk_categoria'].setValue(item.fk_categoria);
    this.formProducto.controls['nombre'].setValue(item.nombre);
    this.formProducto.controls['costo'].setValue(item.costo);
    this.formProducto.controls['unidades'].setValue(item.unidades);
    if(item.estado == true){
      this.formProducto.controls['estado'].setValue(1);
    }else{
      this.formProducto.controls['estado'].setValue(0);
    }
  }


  guardarProducto(){
    if(this.formProducto.value.estado == "1"){
      this.formProducto.controls['estado'].setValue(true);
    }else if(this.formProducto.value.estado == "0"){
      this.formProducto.controls['estado'].setValue(false);
    }
    const fechaActual = new Date(); 
    const fechaFormateada = fechaActual.toISOString().slice(0, 19).replace('T', ' ');

    this.formProducto.controls['fk_categoria'].setValue(1);
    this.formProducto.controls['fecha_creacion'].setValue(fechaFormateada);
    this.formProducto.controls['usuario_creacion'].setValue('admon');
    this.productoService.postProducto(this.formProducto.value).subscribe(resp =>{
      if(resp){
        this.list();
        this.formProducto.reset();
      }
    });
  }

  actualizarProducto(){
    if(this.formProducto.value.estado == "1"){
      this.formProducto.controls['estado'].setValue(true);
    }else if(this.formProducto.value.estado == "0"){
      this.formProducto.controls['estado'].setValue(false);
    }
    
    const fechaActual = new Date(); 
    const fechaFormateada = fechaActual.toISOString().slice(0, 19).replace('T', ' ');

    this.formProducto.controls['fk_categoria'].setValue(1);
    this.formProducto.controls['fecha_creacion'].setValue(fechaFormateada);
    this.formProducto.controls['usuario_creacion'].setValue('admon');
    this.formProducto.controls['fecha_mod'].setValue(fechaFormateada);
    this.formProducto.controls['usuario_mod'].setValue('admon');
    this.productoService.putProducto(this.formProducto.value).subscribe(resp =>{
      if(resp){
        this.list();
        this.formProducto.reset();
      }
    });
  }

  selectDeleteProducto(item: any){
    this.formProducto.controls['nombre'].setValue(item.nombre);
    this.formProducto.controls['id_producto'].setValue(item.id_producto);
  }

  eliminarProducto(){

    const fechaActual = new Date(); 
    const fechaFormateada = fechaActual.toISOString().slice(0, 19).replace('T', ' ');

    this.formProducto.controls['estado'].setValue(false);
    this.formProducto.controls['fecha_creacion'].setValue(fechaFormateada);
    this.formProducto.controls['usuario_creacion'].setValue('admon');
    this.formProducto.controls['fecha_mod'].setValue(fechaFormateada);
    this.formProducto.controls['usuario_mod'].setValue('admon');
  
    this.productoService.deleteProducto(this.formProducto.value).subscribe(resp =>{
      if(resp){
        this.list();
        this.formProducto.reset();
      }
    });
  }

}
