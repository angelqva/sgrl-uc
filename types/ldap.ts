export interface ILDAPAutenticarseResponse {
  errors?: {
    usuario?: string;
    contraseña?: string;
    conexión?: string;
    tipos?: string;
  };
  data?: {
    usuario: string;
    nombreCompleto: string;
    rol: string;
    correo: string;
  };
}
