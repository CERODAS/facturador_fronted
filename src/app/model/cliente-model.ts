export class clienteModel{
    id_cliente: number = 0;
    nombre: string = '';
    dpi: string = '';
    telefono: string = '';
    direccion: string = '';
    nit: string = '';
    fecha_creacion: string = '';
    usuario_creacion: string = '';
    fecha_mod: string = '';
    usuario_mod: string = '';
    estado: boolean = false
}

export class clienteResponse{
    nit: string = '';
    nombre: string = '';
}