import { Icon } from "@iconify/react";

import FormCrearArea from "./_components/form";

import BtnLink from "@/components/btn-link";
import Headings from "@/components/headings";

export default function PageAreasCrear() {
  return (
    <>
      <Headings
        action={
          <BtnLink
            href="/panel/gestionar/areas"
            icon={
              <Icon
                className="w-12 h-12 text-white"
                icon="solar:multiple-forward-left-bold"
              />
            }
          >
            Áreas
          </BtnLink>
        }
      >
        <h1 className="text-3xl font-bold mb-2 text-secondary-800">
          Crear Área
        </h1>
        <p className="text-lg">
          Completa el formulario para registrar una nueva área en el sistema.
          Asegúrate de ingresar todos los datos requeridos correctamente antes
          de guardar.
        </p>
      </Headings>
      <section className="mt-10">
        <FormCrearArea />
      </section>
    </>
  );
}
