"use server";
import { revalidatePath } from "next/cache";
import { Local } from "@prisma/client";
import { cookies } from "next/headers";

import { handleErrors } from "@/lib/utils";
import { ServiceLocal } from "@/services/service.local";

export async function saveLocal(
  prevState: {
    codigo?: string;
    fields?: Record<string, string>;
    errors?: Record<string, string | string[]>;
    type?: "success" | "error";
    local?: Local;
  },
  formData: FormData,
) {
  const newState = { ...prevState };

  newState.fields = Object.fromEntries(formData.entries()) as Record<
    string,
    string
  >;

  if (newState.codigo) {
    try {
      const local = await ServiceLocal.update(newState.codigo, formData);

      newState.type = "success";
      newState.errors = {} as Record<string, string | string[]>;

      if (local.codigo !== newState.codigo) {
        revalidatePath(`/panel/gestionar/locales`);
        const cookieStore = await cookies();

        cookieStore.set(
          "feedback",
          JSON.stringify({
            type: "success",
            message: `Local: ${local.nombre} actualizado.`,
          }),
        );
      } else {
        revalidatePath(`/panel/gestionar/locales/${local.codigo}`);
      }
      newState.local = local;
    } catch (error) {
      newState.type = "error";
      console.log({ error });
      newState.errors = handleErrors(error);
    }
  } else {
    try {
      await ServiceLocal.create(formData);

      newState.type = "success";
      newState.errors = {} as Record<string, string | string[]>;
      revalidatePath(`/panel/gestionar/locales`);
    } catch (error) {
      newState.type = "error";
      newState.errors = handleErrors(error);
    }
  }

  return newState;
}
export async function deleteLocal(
  prevState: { toast?: string },
  formData: FormData,
) {
  const newState = { ...prevState };

  try {
    const codigo = formData.get("codigo")?.toString() ?? null;

    if (!codigo) return { toast: "Provea un codigo para eliminar" };
    const area = await ServiceLocal.delete(codigo);
    const cookieStore = await cookies();

    cookieStore.set(
      "feedback",
      JSON.stringify({
        type: "success",
        message: `Local: ${area.nombre} eliminado.`,
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
