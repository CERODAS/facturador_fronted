import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { clienteResponse } from 'src/app/model/cliente-model';
import { productoModel } from 'src/app/model/producto.model';
import { FacturaService } from 'src/app/service/factura.service';
import { ProductoService } from 'src/app/service/producto.service';

interface Registro {
  cantidad: number;
  id_producto: number;
  descripcion: string;
  precio_unitario: number;
  subtotal: number;
}

@Component({
  selector: 'app-factura',
  templateUrl: './factura.component.html',
  styleUrls: ['./factura.component.css']
})
export class FacturaComponent implements OnInit{

  formFactura: FormGroup = new FormGroup({});
  formFac: FormGroup = new FormGroup({});
  listCliente: clienteResponse[] = [];
  listProducto: productoModel[] = [];
  cantidad: number = 0;
  descripcion: string = '';
  id_prod: number = 0;
  
  registros: Registro[] = [];
  total: number = 0;
  noFac: string = '';

  nuevoRegistro: Registro = {
    cantidad: 0,
    id_producto: 0,
    descripcion: '',
    precio_unitario: 0,
    subtotal: 0
  };

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
      noFactura: new FormControl(''),
      fk_cliente: new FormControl(''),
      fecha: new FormControl(''),
      fecha_creacion: new FormControl(''),
      usuario_creacion: new FormControl(''),
      estado: new FormControl('')
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

        this.nuevoRegistro.id_producto = productoSeleccionado.id_producto;
        this.nuevoRegistro.descripcion = productoSeleccionado.nombre;
        this.nuevoRegistro.precio_unitario = parseInt(productoSeleccionado.costo);

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

        this.descripcion = '';
        this.id_prod = 0;

        // Deshabilitar el botón y el input
        this.formFactura.get('V_unidades')?.disable();
        this.formFactura.get('fk_producto')?.disable();
    }
  }

  agregarRegistro() {
    // Calcula el subtotal (puedes adaptar esta lógica según tus necesidades)
    this.nuevoRegistro.subtotal = this.nuevoRegistro.cantidad * this.nuevoRegistro.precio_unitario;
    debugger;
    // this.nuevoRegistro.descripcion = this.descripcion;
    // Agregar el nuevo registro a la lista
    this.registros.push({ ...this.nuevoRegistro });

    this.actualizarTotal();
    if(this.noFac != null || this.noFac != ''){
      this.noFac = this.generarNumeroAleatorio();
    }
    
    this.formFactura.get('noFactura')?.setValue(this.generarNumeroAleatorio());
    // Limpiar el formulario después de agregar el registro
    this.nuevoRegistro = {
      cantidad: 0,
      id_producto: 0,
      descripcion: '',
      precio_unitario: 0,
      subtotal: 0
    };    
  }

  eliminarRegistro(index: number) {
    // Restar el subtotal al eliminar un registro
    this.total -= this.registros[index].subtotal;

    // Eliminar un registro de la lista
    this.registros.splice(index, 1);
  }

  private actualizarTotal() {
    // Calcular el nuevo total sumando los subtotales de todos los registros
    this.total = this.registros.reduce((acc, registro) => acc + registro.subtotal, 0);
  }

  generarNumeroAleatorio(): string {
    const letra1 = String.fromCharCode(65 + Math.floor(Math.random() * 26));
    const letra2 = String.fromCharCode(65 + Math.floor(Math.random() * 26));
    const numeroAleatorio = Math.floor(1000 + Math.random() * 9000).toString().slice(0, 4);

    return `${letra1}${letra2}${numeroAleatorio}`;
  }

  generarFactura(){
    this.formFactura.controls['fk_cliente'].setValue(13);
    const fechaActual = new Date(); 
    const fechaFormateada = fechaActual.toISOString().slice(0, 19).replace('T', ' ');
    this.formFactura.controls['fecha'].setValue(fechaFormateada);
    this.formFactura.controls['fecha_creacion'].setValue(fechaFormateada);
    this.formFactura.controls['usuario_creacion'].setValue('admon');
    this.formFactura.controls['estado'].setValue(true);

    var id_factura = this.formFactura.get('noFactura')?.value;
    var fk_cliente = 13;
    var fecha = this.formFactura.get('fecha')?.value;
    var fecha_creacion = this.formFactura.get('fecha_creacion')?.value;
    var usuario_creacion = this.formFactura.get('usuario_creacion')?.value;
    var estado = this.formFactura.get('estado')?.value;
    var fecha_mod = fechaFormateada;
    var usuario_mod = 'admon';

    var facturaData = {
      id_factura,
      fk_cliente,
      fecha,
      fecha_creacion,
      usuario_creacion,
      fecha_mod,
      usuario_mod,
      estado
    };
    debugger;
    this.facturaService.insertarFactura(facturaData).subscribe(resp => {
      if(resp){
        this.formFactura.reset();
      }
    })
  }
}
