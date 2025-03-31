import { Icon } from "@iconify/react";

import FormLocales from "../_components/form";

import BtnLink from "@/components/btn-link";
import Headings from "@/components/headings";
import { ServiceArea } from "@/services/service.area";

export default async function Page() {
  const areas = await ServiceArea.list();

  return (
    <>
      <Headings
        action={
          <BtnLink
            href="/panel/gestionar/locales"
            icon={
              <Icon
                className="w-12 h-12 text-white"
                icon="solar:multiple-forward-left-bold"
              />
            }
          >
            Locales
          </BtnLink>
        }
      >
        <h1 className="text-3xl font-bold mb-2 text-secondary-800">
          Crear Local
        </h1>
        <p className="text-lg">
          Completa el formulario para registrar un nuevo local en el sistema.
          Asegúrate de ingresar todos los datos requeridos correctamente antes
          de guardar.
        </p>
      </Headings>
      <section className="mt-10">
        <FormLocales areas={areas} />
      </section>
    </>
  );
}
