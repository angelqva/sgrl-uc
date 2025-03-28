import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD") // separa tildes
    .replace(/[\u0300-\u036f]/g, "") // elimina tildes
    .replace(/[^a-z0-9 -]/g, "") // elimina caracteres especiales
    .replace(/\s+/g, "-") // espacios a guiones
    .replace(/-+/g, "-") // múltiples guiones a uno solo
    .replace(/^-+|-+$/g, ""); // elimina guiones al principio y al final
}

export const handleErrors = (error: any) => {
  if (error instanceof Error) {
    try {
      const parsedErrors = JSON.parse(error.message) as Record<
        string,
        string | string[]
      >;

      if (!parsedErrors.toast) {
        parsedErrors["toast"] = "Verifique los campos con error";
      }

      return parsedErrors;
    } catch (err) {
      return {
        toast: `Muestre este error al administrador: ${error.message}`,
      } as Record<string, string | string[]>;
    }
  }
};
