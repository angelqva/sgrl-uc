import { Icon } from "@iconify/react";

import FormActividadCategoria from "../_components/form";

import BtnLink from "@/components/btn-link";
import Headings from "@/components/headings";

export default function PageActividadCategoriaCrear() {
  return (
    <>
      <Headings
        action={
          <BtnLink
            href="/panel/gestionar/actividades-categorias"
            icon={
              <Icon
                className="w-12 h-12 text-white"
                icon="solar:multiple-forward-left-bold"
              />
            }
          >
            Actividades Categorias
          </BtnLink>
        }
      >
        <h1 className="text-3xl font-bold mb-2 text-secondary-800">
          Crear Categoria de Actividades
        </h1>
        <p className="text-lg">
          Completa el formulario para registrar una nueva categria en el
          sistema. Asegúrate de ingresar todos los datos requeridos
          correctamente antes de guardar.
        </p>
      </Headings>
      <section className="mt-10">
        <FormActividadCategoria />
      </section>
    </>
  );
}
