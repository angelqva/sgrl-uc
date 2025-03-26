import { redirect } from "next/navigation";
import { Icon } from "@iconify/react";

import ModalDeleteArea from "../_components/delete-area";

import { ServiceArea } from "@/services/service.area";
import Headings from "@/components/headings";
import BtnLink from "@/components/btn-link";

export default async function PageContenidoArea({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const area = await ServiceArea.retrieve(slug);

  if (!area) return redirect("/panel/gestionar/areas");

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
            Areas
          </BtnLink>
        }
      >
        <h1 className="text-3xl font-bold mb-2 text-secondary-800 flex items-center">
          <Icon
            className="w-12 h-12 mr-2"
            icon="solar:streets-map-point-bold-duotone"
          />
          {area.nombre}
        </h1>
        <p className="text-lg">
          {area.descripcion ??
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
          {area.codigo}
        </p>
        <p>
          <Icon
            className="w-8 h-8 mr-2 -mt-1 inline-flex"
            icon="solar:text-square-2-broken"
          />
          <b>Nombre: </b>
          {area.nombre}
        </p>
        <p className="leading-8">
          <Icon
            className="w-8 h-8 mr-2 -mt-1 inline-flex"
            icon="solar:map-point-wave-broken"
          />
          <b>Ubicación: </b>
          {area.ubicacion}
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
            href={`/panel/gestionar/areas/${slug}/editar`}
            icon={
              <Icon
                className="w-8 h-8 text-white"
                icon="solar:text-field-focus-bold"
              />
            }
          >
            Editar
          </BtnLink>
          <ModalDeleteArea area={area} />
        </div>
      </section>
    </>
  );
}
