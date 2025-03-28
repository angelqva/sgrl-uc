import { redirect } from "next/navigation";
import { Icon } from "@iconify/react";

import FormActividadCategoria from "../../_components/form";

import Headings from "@/components/headings";
import BtnLink from "@/components/btn-link";
import { ServiceActividadCategoria } from "@/services/service.actividad-categoria";

export default async function PageEditarCategoria({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const categoria = await ServiceActividadCategoria.retrieve(slug);

  if (!categoria) return redirect("/panel/gestionar/actividades-categorias");

  return (
    <>
      <Headings
        action={
          <BtnLink
            href={`/panel/gestionar/actividades-categorias/${slug}`}
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
          <Icon className="w-12 h-12 mr-2" icon={categoria.icono} />
          {categoria.nombre} Editar
        </h1>
        <p className="text-lg">
          Complete el formulario para realizar cambios en la categoria
        </p>
      </Headings>
      <section className="mt-10">
        <FormActividadCategoria categoria={categoria} />
      </section>
    </>
  );
}
