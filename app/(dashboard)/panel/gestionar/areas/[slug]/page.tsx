import { notFound } from "next/navigation";

import { ServiceArea } from "@/services/service.area";

export default async function PageContenidoArea({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const area = await ServiceArea.retrieve(slug);

  if (!area) return notFound();

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold">{area.nombre}</h1>
      <p className="text-gray-600">{area.descripcion}</p>
    </div>
  );
}
