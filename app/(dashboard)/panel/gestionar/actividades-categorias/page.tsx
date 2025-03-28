import { Icon } from "@iconify/react";
import { cookies } from "next/headers";

import ListActividadCategoria from "./_components/list";

import BtnLink from "@/components/btn-link";
import Headings from "@/components/headings";
import FeedBack from "@/components/feedback";
import { ServiceActividadCategoria } from "@/services/service.actividad-categoria";

export default async function PageGestionarActividadesCategorias() {
  const categorias = await ServiceActividadCategoria.list();
  const cookieStore = await cookies();
  const feedback = cookieStore.get("feedback");

  return (
    <>
      {feedback && <FeedBack feedback={feedback.value} />}
      <Headings
        action={
          <BtnLink
            href="/panel/gestionar"
            icon={
              <Icon
                className="w-12 h-12 text-white"
                icon="solar:multiple-forward-left-bold"
              />
            }
          >
            Gestionar
          </BtnLink>
        }
      >
        <h1 className="text-3xl font-bold mb-2 text-secondary-800">
          Gestión de las Categorias de Actividades
        </h1>
        <p className="text-lg">
          Gestiona fácilmente las categorias de actividades del sistema: puedes
          filtrarlas, crear nuevas, editarlas o eliminarlas según lo necesites.
        </p>
      </Headings>
      <ListActividadCategoria categorias={categorias} />
    </>
  );
}
