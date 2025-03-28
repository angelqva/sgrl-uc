import { Icon } from "@iconify/react";
import { cookies } from "next/headers";

import ListArea from "./_components/list";

import BtnLink from "@/components/btn-link";
import Headings from "@/components/headings";
import { ServiceArea } from "@/services/service.area";
import FeedBack from "@/components/feedback";

export default async function PageGestionarAreas() {
  const areas = await ServiceArea.list();
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
