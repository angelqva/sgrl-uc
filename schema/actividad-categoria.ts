import { z } from "zod";

import { stringMinLengthSchema } from ".";

export const actividadCategoriaNombreSchema = z.object({
  nombre: stringMinLengthSchema,
});

export const actividadCategoriaIconoSchema = z.object({
  icono: stringMinLengthSchema,
});

export const actividadCategoriaDescripcionSchema = z.object({
  descripcion: stringMinLengthSchema,
});

export const actividadCategoriaSchema = actividadCategoriaNombreSchema
  .merge(actividadCategoriaDescripcionSchema)
  .merge(actividadCategoriaIconoSchema);
