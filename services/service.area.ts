import { Area } from "@prisma/client";

import { prisma } from "@/lib/prisma";
import { slugify } from "@/lib/utils";
import { areaSchema } from "@/schema/area";

export class ServiceArea {
  static async list(): Promise<Area[]> {
    return await prisma.area.findMany({
      orderBy: { nombre: "asc" },
    });
  }

  static async retrieve(slug: string): Promise<Area | null> {
    return await prisma.area.findUnique({ where: { slug } });
  }

  static async create(formData: FormData) {
    const data = Object.fromEntries(formData.entries());
    const parsed = areaSchema.safeParse(data);

    if (parsed.success) {
      let existsByNombre;
      let existsByCodigo;

      try {
        existsByNombre = await prisma.area.findUnique({
          where: { nombre: parsed.data.nombre },
        });
        existsByCodigo = await prisma.area.findUnique({
          where: { codigo: parsed.data.codigo },
        });
      } catch (error) {
        console.log({ error });
        throw new Error(JSON.stringify({ toast: "Compruebe su conexión" }));
      }

      if (existsByNombre) {
        throw new Error(JSON.stringify({ nombre: "Este campo ya existe" }));
      }

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

      throw new Error(JSON.stringify(fieldErrors));
    }
  }

  static async update(slug: string, data: FormData) {
    const parsed = areaSchema.safeParse(data);

    if (parsed.success) {
      let existeSlug;

      try {
        existeSlug = await prisma.area.findUnique({
          where: { slug: slug },
        });
      } catch (error) {
        console.log({ error });
        throw new Error(JSON.stringify({ toast: "Compruebe su conexión" }));
      }
      if (!existeSlug) {
        throw new Error(
          JSON.stringify({
            toast: "Este Elemento no existe! Actualiza la página",
          }),
        );
      }
      const fields = { ...parsed.data, slug: slugify(parsed.data.nombre) };

      try {
        return await prisma.area.update({
          where: { slug: slug },
          data: fields,
        });
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

  static async delete(slug: string): Promise<Area> {
    return await prisma.area.delete({ where: { slug } });
  }
}
