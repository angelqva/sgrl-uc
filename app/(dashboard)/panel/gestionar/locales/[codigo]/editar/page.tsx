import { redirect } from "next/navigation";
import { Icon } from "@iconify/react";

import FormLocal from "../../_components/form";

import Headings from "@/components/headings";
import BtnLink from "@/components/btn-link";
import { ServiceLocal } from "@/services/service.local";
import { ServiceArea } from "@/services/service.area";

export default async function Page({
  params,
}: {
  params: Promise<{ codigo: string }>;
}) {
  const { codigo } = await params;
  const local = await ServiceLocal.retrieve(codigo);
  const areas = await ServiceArea.list();

  if (!local) return redirect("/panel/gestionar/locales");

  return (
    <>
      <Headings
        action={
          <BtnLink
            href={`/panel/gestionar/locales/${codigo}`}
            icon={
              <Icon
                className="w-12 h-12 text-white"
                icon="solar:multiple-forward-left-bold"
              />
            }
          >
            Contenido
          </BtnLink>
        }
      >
        <h1 className="text-3xl font-bold mb-2 text-secondary-800 flex items-center">
          <Icon className="w-12 h-12 mr-2" icon="solar:exit-bold-duotone" />
          {local.nombre} Editar
        </h1>
        <p className="text-lg">
          Complete el formulario para realizar cambios en el área
        </p>
      </Headings>
      <section className="mt-10">
        <FormLocal areas={areas} local={local} />
      </section>
    </>
  );
}
