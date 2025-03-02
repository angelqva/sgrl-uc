import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  // 🔍 Redirect if user is not authenticated
  if (!session) {
    redirect("/autenticarse");
  }

  return (
    <div>
      <h1 className="text-2xl font-bold">
        Bienvenido, {session.user.nombreCompleto}
      </h1>
      <p>Correo: {session.user.correo}</p>
      <p>Roles: {session.user.roles}</p>
    </div>
  );
}
