"use client";
import { Input } from "@heroui/input";
import { Icon } from "@iconify/react";
import { ActividadCategoria } from "@prisma/client";
import { useMemo, useState } from "react";
import { Card, CardBody, CardHeader } from "@heroui/react";

import BtnLink from "@/components/btn-link";

export default function ListActividadCategoria({
  categorias,
}: {
  categorias: ActividadCategoria[];
}) {
  const [filter, setFilter] = useState("");

  const filteredAreas = useMemo(() => {
    const query = filter.trim().toLowerCase();

    if (query.length === 0) return categorias;

    return categorias.filter(
      (categoria) =>
        categoria.nombre.toLowerCase().includes(query) ||
        categoria.icono.toLowerCase().includes(query) ||
        categoria.descripcion?.toLocaleLowerCase().includes(query) ||
        categoria.slug.toLowerCase().includes(query),
    );
  }, [filter, categorias]);

  return (
    <section className="space-y-10">
      <div className="flex flex-col sm:flex-row gap-5 items-center">
        <BtnLink
          className="w-full sm:w-fit text-lg font-semibold py-6 px-4"
          href={`/panel/gestionar/actividades-categorias/crear`}
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
          placeholder="Filtrar por nombre, icono ..."
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

      {categorias.length === 0 ? (
        <p className="">No hay categorias registradas aún.</p>
      ) : filteredAreas.length === 0 ? (
        <p className="">No se encontraron categorias con ese criterio.</p>
      ) : (
        <div className="flex flex-wrap gap-5">
          {filteredAreas.map((categoria) => (
            <Card
              key={categoria.id}
              className="w-full md:max-w-xs hover:shadow-lg bg-secondary-200/15"
            >
              <CardHeader className="flex justify-between min-h-20">
                <div className="flex items-center">
                  <Icon
                    className="w-12 h-12 min-w-12 text-secondary-600"
                    icon={categoria.icono}
                  />
                  <h3 className="text-xl font-semibold pl-2 text-secondary-800 line-clamp-2">
                    {categoria.nombre}
                  </h3>
                </div>
              </CardHeader>
              <CardBody className="space-y-4 text-secondary-800">
                <BtnLink
                  className="w-full text-lg font-semibold"
                  href={`/panel/gestionar/actividades-categorias/${categoria.slug}`}
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
