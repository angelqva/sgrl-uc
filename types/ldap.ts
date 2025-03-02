export interface ILDAPAutenticarseResponse {
  errors?: {
    usuario?: string;
    contraseña?: string;
    conexión?: string;
    tipos?: string;
  };
  data?: {
    usuario: string;
    displayName: string;
    role: string;
    mail: string;
  };
}
