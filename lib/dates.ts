import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(customParseFormat);

/**
 * Verifica si una fecha tiene el formato correcto `YYYY-MM-DD` y es válida.
 * @param dateString Fecha en formato string
 * @returns boolean
 */
export const isValidDate = (dateString: string): boolean => {
  return dayjs(dateString, "YYYY-MM-DD", true).isValid();
};

/**
 * Verifica si la fecha es válida y está en el futuro o presente.
 * @param dateString Fecha en formato `YYYY-MM-DD`
 * @returns boolean
 */
export const isValidFutureDate = (dateString: string): boolean => {
  const date = dayjs(dateString, "YYYY-MM-DD", true);

  return date.isValid() && date.isAfter(dayjs().subtract(1, "day"), "day"); // Solo permite hoy o fechas futuras
};
