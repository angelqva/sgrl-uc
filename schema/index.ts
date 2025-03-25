import { z } from "zod";

// 🔹 Campo string requerido con trim
export const stringRequiredSchema = z
  .string({ message: "El campo es obligatorio" })
  .min(1, { message: "El campo es obligatorio" })
  .transform((val) => val.trim());

// 🔹 Campo requerido + longitud mínima de 3 no vacíos
export const stringMinLengthSchema = stringRequiredSchema.refine(
  (val) => val.length >= 3,
  {
    message: "El campo debe tener al menos 3 caracteres no vacíos",
  },
);

// 🔹 Campo opcional, pero si tiene valor, debe tener al menos 3 caracteres sin espacios
export const optionalStringMinLengthSchema = z
  .string()
  .refine(
    (val) => {
      if (val === undefined || val.length === 0) return true;

      return val.trim().length >= 3;
    },
    {
      message: "El campo debe tener al menos 3 caracteres no vacíos",
    },
  )
  .optional();
