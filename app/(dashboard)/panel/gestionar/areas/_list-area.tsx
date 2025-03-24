"use client";

import { Area } from "@prisma/client";
import { useMemo, useState } from "react";
import { Card, CardHeader, CardBody, Input } from "@heroui/react";

type Props = {
  areas: Area[];
};

export default function ListArea({ areas }: Props) {
  const [filter, setFilter] = useState("");

  const filteredAreas = useMemo(() => {
    const query = filter.trim().toLowerCase();

    if (query.length === 0) return areas;

    return areas.filter(
      (area) =>
        area.nombre.toLowerCase().includes(query) ||
        area.codigo.toLowerCase().includes(query) ||
        area.slug.toLowerCase().includes(query),
    );
  }, [filter, areas]);

  return (
    <section className="space-y-4">
      <Input
        placeholder="Buscar por nombre, código o slug"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />

      {areas.length === 0 ? (
        <p className="text-gray-500 text-sm">No hay áreas registradas aún.</p>
      ) : filteredAreas.length === 0 ? (
        <p className="text-gray-500 text-sm">
          No se encontraron áreas con ese criterio.
        </p>
      ) : (
        <div className="flex flex-wrap gap-5">
          {filteredAreas.map((area) => (
            <Card key={area.id} className="w-full md:max-w-xs">
              <CardHeader>
                <h3 className="text-lg font-semibold">{area.nombre}</h3>
              </CardHeader>
              <CardBody className="space-y-1 text-sm text-gray-600">
                <p>
                  <strong>Código:</strong> {area.codigo}
                </p>
                <p>
                  <strong>Slug:</strong> {area.slug}
                </p>
                {area.ubicacion && (
                  <p>
                    <strong>Ubicación:</strong> {area.ubicacion}
                  </p>
                )}
                {area.descripcion && (
                  <p>
                    <strong>Descripción:</strong> {area.descripcion}
                  </p>
                )}
              </CardBody>
            </Card>
          ))}
        </div>
      )}
    </section>
  );
}
