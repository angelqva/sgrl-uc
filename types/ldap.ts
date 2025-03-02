export interface ILDAPAutenticarseResponse {
  errors?: {
    usuario?: string;
    contraseña?: string;
    toast?: string;
  };
  data?: {
    usuario: string;
    nombreCompleto: string;
    rol: string;
    correo: string;
  };
}
