import { z } from "zod";

import {
  arrayEmailsSchema,
  stringMinLengthSchema,
  stringRequiredSchema,
} from ".";

export const localNombreSchema = z.object({
  nombre: stringMinLengthSchema,
});

export const localResponsablesSchema = z.object({
  responsables: arrayEmailsSchema,
});

export const localCodigoSchema = z.object({
  codigo: stringMinLengthSchema,
});

export const localAreaSchema = z.object({
  area: stringRequiredSchema,
});

export const localDescripcionSchema = z.object({
  descripcion: stringMinLengthSchema,
});

export const localSchema = localNombreSchema
  .merge(localCodigoSchema)
  .merge(localAreaSchema)
  .merge(localResponsablesSchema)
  .merge(localDescripcionSchema);
