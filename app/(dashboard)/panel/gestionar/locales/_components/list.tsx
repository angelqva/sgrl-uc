"use client";

import { Local } from "@prisma/client";
import { useMemo, useState } from "react";
import { Card, CardHeader, CardBody, Input } from "@heroui/react";
import { Icon } from "@iconify/react";

import BtnLink from "@/components/btn-link";

type Props = {
  locales: Local[];
};

export default function ListLocales({ locales }: Props) {
  const [filter, setFilter] = useState("");

  const filteredLocales = useMemo(() => {
    const query = filter.trim().toLowerCase();

    if (query.length === 0) return locales;

    return locales.filter(
      (local) =>
        local.nombre.toLowerCase().includes(query) ||
        local.codigo.toLowerCase().includes(query) ||
        local.descripcion?.toLocaleLowerCase().includes(query) ||
        local.responsables?.toLocaleLowerCase().includes(query),
    );
  }, [filter, locales]);

  return (
    <section className="space-y-10">
      <div className="flex flex-col sm:flex-row gap-5 items-center">
        <BtnLink
          className="w-full sm:w-fit text-lg font-semibold py-6 px-4"
          href={`/panel/gestionar/locales/crear`}
          icon={
            <Icon
              className="w-7 h-7 min-w-7 text-white"
              icon="solar:add-square-bold"
            />
          }
        >
          Agregar
        </BtnLink>
        <Input
          color="secondary"
          placeholder="Filtrar por nombre, código ..."
          size="lg"
          startContent={
            <Icon
              className="w-8 h-8 min-w-8 text-secondary-600"
              icon="solar:filter-bold-duotone"
            />
          }
          value={filter}
          variant="bordered"
          onChange={(e) => setFilter(e.target.value)}
        />
      </div>

      {locales.length === 0 ? (
        <p className="">No hay locales registrados aún.</p>
      ) : filteredLocales.length === 0 ? (
        <p className="">No se encontraron locales con ese criterio.</p>
      ) : (
        <div className="flex flex-wrap gap-5">
          {filteredLocales.map((local) => (
            <Card
              key={local.id}
              className="w-full md:max-w-xs hover:shadow-lg bg-secondary-200/15"
            >
              <CardHeader className="flex justify-between min-h-20">
                <div className="flex items-center">
                  <Icon
                    className="w-12 h-12 min-w-12 text-secondary-600"
                    icon="solar:exit-bold-duotone"
                  />
                  <h3 className="text-xl font-semibold pl-2 text-secondary-800 line-clamp-2">
                    {local.nombre}
                  </h3>
                </div>
                <p className="text-secondary-800 flex items-center text-sm flex-shrink-0">
                  <Icon
                    className="w-4 h-4 min-w-4"
                    icon="solar:hashtag-bold-duotone"
                  />
                  <strong>{local.codigo}</strong>
                </p>
              </CardHeader>
              <CardBody className="space-y-4 text-secondary-800">
                <p className="line-clamp-2 min-h-12">
                  <strong>Descripción:</strong> {local.descripcion}
                </p>

                <BtnLink
                  className="w-full text-lg font-semibold"
                  href={`/panel/gestionar/locales/${local.codigo}`}
                  icon={
                    <Icon
                      className="w-7 h-7 text-white"
                      icon="solar:plate-bold"
                    />
                  }
                >
                  Ver Contenido
                </BtnLink>
              </CardBody>
            </Card>
          ))}
        </div>
      )}
    </section>
  );
}
