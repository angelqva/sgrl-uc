"use server";
import { revalidatePath } from "next/cache";
import { ActividadCategoria } from "@prisma/client";
import { cookies } from "next/headers";

import { handleErrors } from "@/lib/utils";
import { ServiceActividadCategoria } from "@/services/service.actividad-categoria";

export async function saveCategoria(
  prevState: {
    slug?: string;
    fields?: Record<string, string>;
    errors?: Record<string, string | string[]>;
    type?: "success" | "error";
    categoria?: ActividadCategoria;
  },
  formData: FormData,
) {
  const newState = { ...prevState };

  newState.fields = Object.fromEntries(formData.entries()) as Record<
    string,
    string
  >;

  if (newState.slug) {
    try {
      const categoria = await ServiceActividadCategoria.update(
        newState.slug,
        formData,
      );

      newState.type = "success";
      newState.errors = {} as Record<string, string | string[]>;

      if (categoria.slug !== newState.slug) {
        revalidatePath(`/panel/gestionar/actividades-categorias`);
        const cookieStore = await cookies();

        cookieStore.set(
          "feedback",
          JSON.stringify({
            type: "success",
            message: `Actividad Categoria: ${categoria.nombre} actualizada.`,
          }),
        );
      } else {
        revalidatePath(
          `/panel/gestionar/actividades-categorias/${categoria.slug}`,
        );
      }
      newState.categoria = categoria;
    } catch (error) {
      newState.type = "error";
      console.log({ error });
      newState.errors = handleErrors(error);
    }
  } else {
    try {
      await ServiceActividadCategoria.create(formData);

      newState.type = "success";
      newState.errors = {} as Record<string, string | string[]>;
      revalidatePath(`/panel/gestionar/actividades-categorias`);
    } catch (error) {
      newState.type = "error";
      newState.errors = handleErrors(error);
    }
  }

  return newState;
}
export async function deleteCategoria(
  prevState: { toast?: string },
  formData: FormData,
) {
  const newState = { ...prevState };

  try {
    const slug = formData.get("slug")?.toString() ?? null;

    if (!slug) return { toast: "Provea un slug para eliminar" };
    const area = await ServiceActividadCategoria.delete(slug);
    const cookieStore = await cookies();

    cookieStore.set(
      "feedback",
      JSON.stringify({
        type: "success",
        message: `Actividad Categoria: ${area.nombre} eliminada.`,
      }),
    );
    newState.toast = undefined;
  } catch (error) {
    newState.toast = "Compruebe si existe o revise su conexión";
  }

  return newState;
}
export async function deleteCookie(name: string) {
  (await cookies()).delete(name);
}
