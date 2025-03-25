import { z } from "zod";

import {
  optionalStringMinLengthSchema,
  stringMinLengthSchema,
  stringRequiredSchema,
} from ".";

export const areaNombreSchema = z.object({
  nombre: stringMinLengthSchema,
});

export const areaCodigoSchema = z.object({
  codigo: stringMinLengthSchema,
});

export const areaUbicacionSchema = z.object({
  ubicacion: stringRequiredSchema,
});

export const areaDescripcionSchema = z.object({
  descripcion: optionalStringMinLengthSchema,
});

export const areaSchema = areaNombreSchema
  .merge(areaCodigoSchema)
  .merge(areaUbicacionSchema)
  .merge(areaDescripcionSchema);
