import { redirect } from "next/navigation";
import { Icon } from "@iconify/react";

import ModalDeleteActividadCategoria from "../_components/delete";

import Headings from "@/components/headings";
import BtnLink from "@/components/btn-link";
import { ServiceActividadCategoria } from "@/services/service.actividad-categoria";

export default async function PageContenidoCategoria({
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
        <h1 className="text-3xl font-bold mb-2 text-secondary-800 flex items-center">
          <Icon className="w-12 h-12 mr-2" icon={categoria.icono} />
          {categoria.nombre}
        </h1>
        <p className="text-lg">
          {categoria.descripcion ??
            "Complete la descripción para visualizar este contenido"}
        </p>
      </Headings>
      <section className="mt-14">
        <h2 className="text-2xl font-semibold text-secondary-800 mb-5">
          Acciones Rápidas
        </h2>
        <div className="flex flex-col justify-center sm:flex-row sm:justify-start gap-5">
          <BtnLink
            className="text-lg w-full max-w-xs py-7 font-semibold"
            color="primary"
            href={`/panel/gestionar/actividades-categorias/${slug}/editar`}
            icon={
              <Icon
                className="w-8 h-8 text-white"
                icon="solar:text-field-focus-bold"
              />
            }
          >
            Editar
          </BtnLink>
          <ModalDeleteActividadCategoria categoria={categoria} />
        </div>
      </section>
    </>
  );
}
