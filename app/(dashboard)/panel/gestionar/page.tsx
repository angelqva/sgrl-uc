import { Icon } from "@iconify/react";

import BtnLink from "@/components/btn-link";
import Headings from "@/components/headings";
import CardLinks from "@/components/card-links";

export default function PageGestionar() {
  return (
    <>
      <Headings
        action={
          <BtnLink
            href="/panel"
            icon={
              <Icon
                className="w-12 h-12 text-white"
                icon="solar:multiple-forward-left-bold"
              />
            }
          >
            Panel Administrativo
          </BtnLink>
        }
      >
        <h1 className="text-3xl font-bold mb-2 text-secondary-800">
          Gestión del Sistema de Reservaciones
        </h1>
        <p className="text-lg">
          Administra las áreas de la universidad, locales y otras
          configuraciones necesarias.
        </p>
      </Headings>
      <CardLinks
        items={[
          {
            nombre: "Áreas",
            href: "/panel/gestionar/areas",
            icon: "solar:streets-map-point-bold-duotone",
          },
          {
            nombre: "Locales",
            href: "/panel/gestionar/locales",
            icon: "solar:map-bold",
          },
          {
            nombre: "Actividades Categorias",
            href: "/panel/gestionar/actividades-categorias",
            icon: "solar:bookmark-square-bold",
          },
        ]}
      />
    </>
  );
}
