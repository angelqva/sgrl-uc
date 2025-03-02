import { z } from "zod";
export interface TipoUsuarioLdap {
  correo?: string;
  usuario?: string;
  rol?: string;
  nombreCompleto?: string;
}
export interface TipoUsuario {
  correo: string;
  nombreCompleto: string;
}
export const schemaValidardUsuario = z.object({
  correo: z.string().email({ message: "Verifique el correo" }),
  nombreCompleto: z
    .string()
    .min(1, "Este campo es requerido")
    .regex(/^[a-zA-Z0-9\s\.,;áéíóúÁÉÍÓÚñÑ]+$/, {
      message:
        "El contenido solo puede contener letras, números, espacios, puntos, comas, punto y coma, y acentos.",
    }),
});
