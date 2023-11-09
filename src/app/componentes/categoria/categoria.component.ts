import { Component, OnInit } from '@angular/core';
import { CategoriaModel } from 'src/app/model/categoria.model';
import { CategoriaService } from 'src/app/service/categoria.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.css']
})

export class CategoriaComponent implements OnInit {
  listaCategoria: CategoriaModel[] = [];
  formCategoria: FormGroup = new FormGroup({});

  constructor(private categoriaService: CategoriaService) { }


    // Propiedades para mensajes de error
    nombreError: string = '';
    isFormValid: boolean = true; 

    
    ngOnInit(): void {
      this.list();
      this.formCategoria = new FormGroup({
        id_categoria: new FormControl(''),
        nombre: new FormControl('', [
          Validators.required,
          Validators.pattern(/^[a-zA-Z]+( [a-zA-Z]+)*$/)
        ]),
        fecha_creacion: new FormControl(''),
        usuario_creacion: new FormControl(''),
        fecha_mod: new FormControl(''),
        usuario_mod: new FormControl(''),
        estado: new FormControl('')
      });
    }
  

  list() {
    this.categoriaService.getCatetoria().subscribe(resp => {
      if (resp) {
        this.listaCategoria = resp;
      }
    });

  }
    // Funciones para validar y mostrar mensajes de error

    onNombreBlur() {
      const nombreControl = this.formCategoria.get('nombre');
      if (nombreControl && nombreControl.hasError('pattern')) {
        this.formCategoria.controls['nombre'].setErrors({ 'pattern': true });
        this.isFormValid = false; // Marcar el formulario como inválido
      } else {
        this.isFormValid = true; // Marcar el formulario como válido
      }
    }
  

    resetField(fieldName: string) {
      this.formCategoria.controls[fieldName].setErrors(null);
    }
  
    clearField(fieldName: string) {
      this.formCategoria.get(fieldName)?.setValue(''); // Establece el valor del campo en blanco
    }
    

  
  nuevaCategoria() {
    this.formCategoria.reset();
  }

  selectCategoria(item: any) {
    this.formCategoria.controls['id_categoria'].setValue(item.id_categoria);
    this.formCategoria.controls['nombre'].setValue(item.nombre);
    if (item.estado == true) {
      this.formCategoria.controls['estado'].setValue(1);
    } else {
      this.formCategoria.controls['estado'].setValue(0);
    }

  }

  guardarCategoria() {
    if (this.formCategoria.value.estado == "1") {
      this.formCategoria.controls['estado'].setValue(true);
    } else if (this.formCategoria.value.estado == "0") {
      this.formCategoria.controls['estado'].setValue(false);
    }
    
    const fechaActual = new Date(); 
    const fechaFormateada = fechaActual.toISOString().slice(0, 19).replace('T', ' ');

    this.formCategoria.controls['fecha_creacion'].setValue(fechaFormateada);
    this.formCategoria.controls['usuario_creacion'].setValue('admon');
    this.categoriaService.postCategoria(this.formCategoria.value).subscribe(resp => {

      if (resp) {
        this.list();
        this.formCategoria.reset();
      }

    });
  }

  actualizarCategoria() {
    if (this.formCategoria.value.estado == "1") {
      this.formCategoria.controls['estado'].setValue(true);
    } else if (this.formCategoria.value.estado == "0") {
      this.formCategoria.controls['estado'].setValue(false);
    }

    const fechaActual = new Date(); 
    const fechaFormateada = fechaActual.toISOString().slice(0, 19).replace('T', ' ');

    this.formCategoria.controls['fecha_creacion'].setValue(fechaFormateada);
    this.formCategoria.controls['usuario_creacion'].setValue('admon');
    this.formCategoria.controls['fecha_mod'].setValue(fechaFormateada);
    this.formCategoria.controls['usuario_mod'].setValue('admon');

    this.categoriaService.putCategoria(this.formCategoria.value).subscribe(resp => {
      if (resp) {
        this.list();
        this.formCategoria.reset();
      }
    });
  }

  selectDeleteCategoria(item: any) {
    this.formCategoria.controls['nombre'].setValue(item.nombre);
    this.formCategoria.controls['id_categoria'].setValue(item.id_categoria);
  }

  eliminarCategoria() {
    
    this.categoriaService.deleteCategoria(this.formCategoria.value).subscribe(resp => {
      if (resp) {
        this.list();
        this.formCategoria.reset();
      }
    });
  }

}
