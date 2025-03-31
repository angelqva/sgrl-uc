import { Icon } from "@iconify/react";
import { cookies } from "next/headers";

import ListLocales from "./_components/list";

import BtnLink from "@/components/btn-link";
import Headings from "@/components/headings";
import FeedBack from "@/components/feedback";
import { ServiceLocal } from "@/services/service.local";

export default async function Page() {
  const locales = await ServiceLocal.list();
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
          Gestión de los Locales
        </h1>
        <p className="text-lg">
          Gestiona fácilmente los locales del sistema: puedes filtrarlos, crear
          nuevos, editarlos o eliminarlos según lo necesites.
        </p>
      </Headings>
      <ListLocales locales={locales} />
    </>
  );
}
