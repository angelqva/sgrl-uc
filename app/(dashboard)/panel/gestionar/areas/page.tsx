import { Icon } from "@iconify/react";

import ListArea from "./_components/list-area";

import BtnLink from "@/components/btn-link";
import Headings from "@/components/headings";
import { ServiceArea } from "@/services/service.area";

export default async function PageGestionarAreas() {
  const areas = await ServiceArea.list();

  return (
    <>
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
          Gestión de las Áreas
        </h1>
        <p className="text-lg">
          Gestiona fácilmente las áreas del sistema: puedes filtrarlas, crear
          nuevas, editarlas o eliminarlas según lo necesites.
        </p>
      </Headings>
      <ListArea areas={areas} />
    </>
  );
}
