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

export const validateString = (key: string, value: string) => {
  const fieldErrors = {} as Record<string, string[]>;

  fieldErrors[key] = [] as string[];

  if (!value || value.length === 0) {
    fieldErrors[key].push("El campo es obligatorio");
  }
  if (value.length < 3) {
    fieldErrors[key].push("El campo debe tener al menos 3 caracteres");
  }

  if (fieldErrors[key].length) {
    return fieldErrors;
  }

  return {} as Record<string, string[]>;
};
export const validateStringOpcional = (key: string, value: string) => {
  const fieldErrors = {} as Record<string, string[]>;

  fieldErrors[key] = [] as string[];

  if (value.length > 0 && value.length < 3) {
    fieldErrors[key].push("El campo debe tener al menos 3 caracteres");
  }

  if (fieldErrors[key].length) {
    return fieldErrors;
  }

  return {} as Record<string, string[]>;
};
export const validateStringRequired = (key: string, value: string) => {
  const fieldErrors = {} as Record<string, string[]>;

  fieldErrors[key] = [] as string[];

  if (!value || value.length === 0) {
    fieldErrors[key].push("El campo es obligatorio");
  }

  if (fieldErrors[key].length) {
    return fieldErrors;
  }

  return {} as Record<string, string[]>;
};
