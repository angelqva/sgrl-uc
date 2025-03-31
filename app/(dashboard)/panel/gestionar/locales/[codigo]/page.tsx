import { redirect } from "next/navigation";
import { Icon } from "@iconify/react";

import ModalDeleteArea from "../_components/delete";

import Headings from "@/components/headings";
import BtnLink from "@/components/btn-link";
import { ServiceLocal } from "@/services/service.local";

export default async function Page({
  params,
}: {
  params: Promise<{ codigo: string }>;
}) {
  const { codigo } = await params;
  const local = await ServiceLocal.retrieve(codigo);

  if (!local) return redirect("/panel/gestionar/locales");

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
        <h1 className="text-3xl font-bold mb-2 text-secondary-800 flex items-center">
          <Icon className="w-12 h-12 mr-2" icon="solar:exit-bold-duotone" />
          {local.nombre}
        </h1>
        <p className="text-lg">
          {local.descripcion ??
            "Complete la descripción del area para visualizar este contenido"}
        </p>
      </Headings>
      <section className="space-y-5 text-xl">
        <p>
          <Icon
            className="w-8 h-8 mr-2 -mt-1 inline-flex"
            icon="solar:hashtag-broken"
          />
          <b>Código: </b>
          {local.codigo}
        </p>
        <p>
          <Icon
            className="w-8 h-8 mr-2 -mt-1 inline-flex"
            icon="solar:text-square-2-broken"
          />
          <b>Nombre: </b>
          {local.nombre}
        </p>
      </section>
      <section className="mt-14">
        <h2 className="text-2xl font-semibold text-secondary-800 mb-5">
          Acciones Rápidas
        </h2>
        <div className="flex flex-col justify-center sm:flex-row sm:justify-start gap-5">
          <BtnLink
            className="text-lg w-full max-w-xs py-7 font-semibold"
            color="primary"
            href={`/panel/gestionar/locales/${codigo}/editar`}
            icon={
              <Icon
                className="w-8 h-8 text-white"
                icon="solar:text-field-focus-bold"
              />
            }
          >
            Editar
          </BtnLink>
          <ModalDeleteArea local={local} />
        </div>
      </section>
    </>
  );
}
