import { Local, Prisma } from "@prisma/client";

import { prisma } from "@/lib/prisma";
import { localSchema } from "@/schema/local";

export class ServiceLocal {
  static model = prisma.local;
  static async list(): Promise<Local[]> {
    return await this.model.findMany({
      orderBy: { updatedAt: "desc" },
    });
  }
  static async listByResponsable(responsable: string): Promise<Local[]> {
    return await this.model.findMany({
      where: {
        responsables: {
          contains: responsable,
          mode: "insensitive",
        },
      },
      orderBy: { updatedAt: "desc" },
    });
  }

  static async retrieve(codigo: string): Promise<Local | null> {
    return await this.model.findUnique({ where: { codigo } });
  }

  static async create(formData: FormData) {
    const entries = Object.fromEntries(formData.entries());
    const data = {} as Record<string, unknown>;

    Object.keys(entries).forEach((key) => {
      if (key === "responsables") {
        data[key] = entries[key].toString().split(";");
      } else {
        data[key] = entries[key].toString();
      }
    });
    const parsed = localSchema.safeParse(data);

    if (parsed.success) {
      const { ["area"]: _, ...localData } = parsed.data;
      const fields = {
        ...localData,
        areaId: parsed.data.area,
        responsables: parsed.data.responsables.join(";"),
      };

      try {
        return await this.model.create({ data: fields });
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
          }
          throw new Error(
            JSON.stringify({
              toast: `DB Error:${error.code} - ${JSON.stringify(error)}`,
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

  static async update(codigo: string, formData: FormData) {
    const entries = Object.fromEntries(formData.entries());
    const data = {} as Record<string, unknown>;

    Object.keys(entries).forEach((key) => {
      if (key === "responsables") {
        data[key] = entries[key].toString().split(";");
      } else {
        data[key] = entries[key].toString();
      }
    });
    const parsed = localSchema.safeParse(data);

    if (parsed.success) {
      const { ["area"]: _, ...localData } = parsed.data;
      const fields = {
        ...localData,
        areaId: parsed.data.area,
        responsables: parsed.data.responsables.join(";"),
      };

      try {
        return await this.model.update({
          where: { codigo },
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
              toast: `DB Error:${error.code} - ${JSON.stringify(error)}`,
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

  static async delete(codigo: string): Promise<Local> {
    return await this.model.delete({ where: { codigo } });
  }
}
