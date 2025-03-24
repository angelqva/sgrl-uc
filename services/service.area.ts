import { Area } from "@prisma/client";
import { z } from "zod";

import { prisma } from "@/lib/prisma";
import { slugify } from "@/lib/utils";

export class ServiceArea {
  static validationArea = z.object({
    nombre: z
      .string()
      .min(1, { message: "El campo es obligatorio" })
      .refine((v) => v.trim().length > 0, {
        message: "No puede ser solo espacios",
      }),
    codigo: z
      .string()
      .min(1, { message: "El campo es obligatorio" })
      .refine((v) => v.trim().length > 0, {
        message: "No puede ser solo espacios",
      }),
    ubicacion: z
      .string()
      .min(1, { message: "El campo es obligatorio" })
      .refine((v) => v.trim().length > 0, {
        message: "No puede ser solo espacios",
      })
      .optional(),
    descripcion: z
      .string()
      .min(1, { message: "El campo es obligatorio" })
      .refine((v) => v.trim().length > 0, {
        message: "No puede ser solo espacios",
      })
      .optional(),
  });
  static async list(): Promise<Area[]> {
    return await prisma.area.findMany({
      orderBy: { nombre: "asc" },
    });
  }

  static async retrieve(slug: string): Promise<Area | null> {
    return await prisma.area.findUnique({ where: { slug } });
  }

  static async create(data: Partial<Omit<Area, "id">>) {
    const parsed = this.validationArea.safeParse(data);

    if (parsed.success) {
      const existsByNombre = await prisma.area.findUnique({
        where: { nombre: parsed.data.nombre },
      });

      if (existsByNombre) {
        throw new Error(JSON.stringify({ nombre: "Este campo ya existe" }));
      }

      const existsByCodigo = await prisma.area.findUnique({
        where: { codigo: parsed.data.codigo },
      });

      if (existsByCodigo) {
        throw new Error(JSON.stringify({ codigo: "Este campo ya existe" }));
      }
      const fields = { ...parsed.data, slug: slugify(parsed.data.nombre) };

      try {
        return await prisma.area.create({ data: fields });
      } catch (error) {
        console.log({ error });
        throw new Error(JSON.stringify({ toast: "Compruebe su conexión" }));
      }
    } else {
      const fieldErrors = { ...parsed.error.formErrors.fieldErrors };
      const joinedErrors = Object.fromEntries(
        Object.entries(fieldErrors).map(([key, messages]) => [
          key,
          (messages ?? []).join(", "),
        ]),
      );

      throw new Error(JSON.stringify(joinedErrors));
    }
  }

  static async update(data: Partial<Omit<Area, "id">>): Promise<Area> {
    if (!data.slug) {
      throw new Error(
        JSON.stringify({ toast: "Este Objeto no existe! Actualiza la página" }),
      );
    }
    const parsed = this.validationArea.safeParse(data);

    if (parsed.success) {
      const fields = { ...parsed.data, slug: slugify(parsed.data.nombre) };

      return await prisma.area.update({
        where: { slug: data.slug },
        data: fields,
      });
    } else {
      const fieldErrors = { ...parsed.error.formErrors.fieldErrors };
      const joinedErrors = Object.fromEntries(
        Object.entries(fieldErrors).map(([key, messages]) => [
          key,
          (messages ?? []).join(", "),
        ]),
      );

      throw new Error(JSON.stringify(joinedErrors));
    }
  }

  static async delete(slug: string): Promise<Area> {
    return await prisma.area.delete({ where: { slug } });
  }
}
