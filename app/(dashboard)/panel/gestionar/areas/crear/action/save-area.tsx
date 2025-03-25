"use server";
import { revalidatePath } from "next/cache";

import { handleErrors } from "@/lib/utils";
import { ServiceArea } from "@/services/service.area";

export async function saveArea(
  prevState: {
    slug?: string;
    fields?: Record<string, string>;
    errors?: Record<string, string | string[]>;
    type?: "success" | "error";
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

      console.log(area);
      newState.type = "success";
      newState.errors = {} as Record<string, string | string[]>;
      revalidatePath(`/panel/gestionar/areas/${newState.slug}`);
    } catch (error) {
      newState.type = "error";
      newState.errors = handleErrors(error);
    }
  } else {
    try {
      const area = await ServiceArea.create(formData);

      console.log(area);
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
