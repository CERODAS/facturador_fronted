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
      fk_producto: new FormControl('')
    });
  }

  buscarPorNit() {
    const nitValue = this.formFactura.value;
    if (!nitValue) {
      console.error('El valor de nit es undefined o vacío.');
      return;
    }
  
    this.facturaService.buscarClientePorNit(nitValue).subscribe(resp => {
      if (resp) {
        console.log(resp);
        this.listCliente = resp;
        this.formFactura.patchValue({
          nombre: { value: resp[0].nombre },
          nit: { value: resp[0].nit },
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

  onSelectedChange(event: any){
    const idProducto = event.target.value;
    debugger;
  }
}
