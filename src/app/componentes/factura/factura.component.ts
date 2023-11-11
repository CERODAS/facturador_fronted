import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { clienteResponse } from 'src/app/model/cliente-model';
import { productoModel } from 'src/app/model/producto.model';
import { FacturaService } from 'src/app/service/factura.service';
import { ProductoService } from 'src/app/service/producto.service';

@Component({
  selector: 'app-factura',
  templateUrl: './factura.component.html',
  styleUrls: ['./factura.component.css']
})
export class FacturaComponent implements OnInit{

  formFactura: FormGroup = new FormGroup({});
  listCliente: clienteResponse[] = [];
  listProducto: productoModel[] = [];
  
  constructor(private facturaService: FacturaService, private productoService: ProductoService){
    
  }

  ngOnInit(): void {
    this.obtenerProducto();
    this.formFactura = new FormGroup({
      nombre: new FormControl(''),
      nit: new FormControl(''),
      fk_producto: new FormControl(''),
      unidades: new FormControl(''),  
      costo: new FormControl('') ,
      V_unidades: new FormControl(''), 
    });
  }
  buscarPorNit() {
    const nitValue = this.formFactura.value.nit;
    if (!nitValue) {
        console.error('El valor de nit es undefined o vacío.');
        return;
    }

    this.facturaService.buscarClientePorNit(nitValue).subscribe(resp => {
        if (resp && resp.length > 0) {
            const cliente = resp[0]; // Obtener el primer cliente del array
            console.log(cliente);
            this.listCliente = [cliente]; // Puedes actualizar el array si es necesario
            this.formFactura.patchValue({
                nombre: { value: cliente.nombre },
                nit: { value: cliente.nit },
                // Puedes agregar otras propiedades aquí según sea necesario
            });
            this.formFactura.markAsPristine();
            this.formFactura.markAsUntouched();
        } else {
            console.error('La respuesta del servicio no tiene la estructura esperada.');
        }
    });
}

  obtenerProducto(){
    this.productoService.getProducto().subscribe(resp => {
      this.listProducto = resp;
    })
  }
  
  onSelectedChange(event: any) {
    const idProducto = event.target.value;

    // Buscar el producto seleccionado en la lista
    const productoSeleccionado = this.listProducto.find(prod => prod.id_producto == idProducto);

    // Verificar si se encontró el producto
    if (productoSeleccionado) {
        // Actualizar las unidades y el costo en el formulario
        this.formFactura.patchValue({
            unidades: productoSeleccionado.unidades,
            costo: productoSeleccionado.costo,
            // Otras propiedades según sea necesario
        });

        // Habilitar el botón y el input
        this.formFactura.get('V_unidades')?.enable();
        this.formFactura.get('fk_producto')?.enable();
    } else {
        // Limpiar las unidades y el costo si no se selecciona un producto válido
        this.formFactura.patchValue({
            unidades: null,
            costo: null,
            // Otras propiedades según sea necesario
        });

        // Deshabilitar el botón y el input
        this.formFactura.get('V_unidades')?.disable();
        this.formFactura.get('fk_producto')?.disable();
    }
}


}
