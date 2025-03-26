import { redirect } from "next/navigation";
import { Icon } from "@iconify/react";

import FormArea from "../../_components/form";

import { ServiceArea } from "@/services/service.area";
import Headings from "@/components/headings";
import BtnLink from "@/components/btn-link";

export default async function PageEditarArea({
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
            href={`/panel/gestionar/areas/${slug}`}
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
          <Icon
            className="w-12 h-12 mr-2"
            icon="solar:streets-map-point-bold-duotone"
          />
          {area.nombre} Editar
        </h1>
        <p className="text-lg">
          Complete el formulario para realizar cambios en el área
        </p>
      </Headings>
      <section className="mt-10">
        <FormArea area={area} />
      </section>
    </>
  );
}
