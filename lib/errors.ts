export class ResponseErrors extends Error {
  public errores: Record<string, string[] | string>;

  constructor(errores: Record<string, string[] | string>) {
    super("Response Errors");
    this.name = "Response Errors";
    this.errores = errores;
  }
}

export function normalizeFieldErrors(
  errors: Record<string, string[] | string>,
): Record<string, string> {
  return Object.keys(errors).reduce<Record<string, string>>((acc, field) => {
    const error = errors[field];

    acc[field] = Array.isArray(error) ? error[0] : error; // Tomar solo el primer error si es un array

    return acc;
  }, {});
}
