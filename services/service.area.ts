import { Area, Prisma } from "@prisma/client";

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
      const fields = { ...parsed.data, slug: slugify(parsed.data.nombre) };

      try {
        return await prisma.area.create({ data: fields });
      } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
          if (error.code === "P2002") {
            // Unique constraint violation
            const target = error.meta?.target as string[];

            if (target?.includes("codigo")) {
              throw new Error(
                JSON.stringify({
                  codigo: "Este campo ya existe en la base de datos",
                }),
              );
            }
            if (target?.includes("nombre")) {
              throw new Error(
                JSON.stringify({
                  nombre: "Este campo ya existe en la base de datos",
                }),
              );
            }
            if (target?.includes("slug")) {
              throw new Error(
                JSON.stringify({
                  nombre: "Este campo ya existe en la base de datos",
                }),
              );
            }
          }
          if (error.code === "P2025") {
            throw new Error(
              JSON.stringify({
                toast: `Actualice, el objeto no existe en la Base de Datos`,
              }),
            );
          }
          throw new Error(
            JSON.stringify({
              toast: `Error de base de datos: ${error.code}, por favor enviar al administrador`,
            }),
          );
        }
        throw new Error(
          JSON.stringify({
            toast: "Compruebe su conexión",
          }),
        );
      }
    } else {
      const fieldErrors = { ...parsed.error.formErrors.fieldErrors };

      throw new Error(JSON.stringify(fieldErrors));
    }
  }

  static async update(slug: string, formData: FormData) {
    const data = Object.fromEntries(formData.entries());
    const parsed = areaSchema.safeParse(data);

    if (parsed.success) {
      const fields = { ...parsed.data, slug: slugify(parsed.data.nombre) };

      try {
        return await prisma.area.update({
          where: { slug: slug },
          data: fields,
        });
      } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
          if (error.code === "P2002") {
            // Unique constraint violation
            const target = error.meta?.target as string[];

            if (target?.includes("codigo")) {
              throw new Error(
                JSON.stringify({
                  codigo: "Este campo ya existe en la base de datos",
                }),
              );
            }
            if (target?.includes("nombre")) {
              throw new Error(
                JSON.stringify({
                  nombre: "Este campo ya existe en la base de datos",
                }),
              );
            }
            if (target?.includes("slug")) {
              throw new Error(
                JSON.stringify({
                  nombre: "Este campo ya existe en la base de datos",
                }),
              );
            }
          }
          if (error.code === "P2025") {
            throw new Error(
              JSON.stringify({
                toast: `Actualice, el objeto no existe en la Base de Datos`,
              }),
            );
          }
          throw new Error(
            JSON.stringify({
              toast: `Error de base de datos: ${error.code}, por favor enviar al administrador`,
            }),
          );
        }
        throw new Error(
          JSON.stringify({
            toast: "Compruebe su conexión",
          }),
        );
      }
    } else {
      const fieldErrors = { ...parsed.error.formErrors.fieldErrors };

      throw new Error(JSON.stringify(fieldErrors));
    }
  }

  static async delete(slug: string): Promise<Area> {
    return await prisma.area.delete({ where: { slug } });
  }
}
