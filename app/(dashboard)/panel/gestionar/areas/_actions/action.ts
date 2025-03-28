"use server";
import { revalidatePath } from "next/cache";
import { Area } from "@prisma/client";
import { cookies } from "next/headers";

import { handleErrors } from "@/lib/utils";
import { ServiceArea } from "@/services/service.area";

export async function saveArea(
  prevState: {
    slug?: string;
    fields?: Record<string, string>;
    errors?: Record<string, string | string[]>;
    type?: "success" | "error";
    area?: Area;
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
      const area = await ServiceArea.update(newState.slug, formData);

      newState.type = "success";
      newState.errors = {} as Record<string, string | string[]>;

      if (area.slug !== newState.slug) {
        revalidatePath(`/panel/gestionar/areas`);
        const cookieStore = await cookies();

        cookieStore.set(
          "feedback",
          JSON.stringify({
            type: "success",
            message: `Área: ${area.nombre} actualizada.`,
          }),
        );
      } else {
        revalidatePath(`/panel/gestionar/areas/${area.slug}`);
      }
      newState.area = area;
    } catch (error) {
      newState.type = "error";
      console.log({ error });
      newState.errors = handleErrors(error);
    }
  } else {
    try {
      await ServiceArea.create(formData);

      newState.type = "success";
      newState.errors = {} as Record<string, string | string[]>;
      revalidatePath(`/panel/gestionar/areas`);
    } catch (error) {
      newState.type = "error";
      newState.errors = handleErrors(error);
    }
  }

  return newState;
}
export async function deleteArea(
  prevState: { toast?: string },
  formData: FormData,
) {
  const newState = { ...prevState };

  try {
    const slug = formData.get("slug")?.toString() ?? null;

    if (!slug) return { toast: "Provea un slug para eliminar" };
    const area = await ServiceArea.delete(slug);
    const cookieStore = await cookies();

    cookieStore.set(
      "feedback",
      JSON.stringify({
        type: "success",
        message: `Área: ${area.nombre} eliminada.`,
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
