export interface Usuario {
    id_usuario: number;
    fk_rol: number;
    usuario: string;
    pass: string;
    nombre: string;
    telefono: string;
    correo: string;
    fecha_creacion: string;
    usuario_creacion: string;
    fecha_mod: string;
    usuario_mod: string;
    estado: boolean;
  }
  
export interface vauleUser{
    usuario: string | null;
    clave: string | null; 
}