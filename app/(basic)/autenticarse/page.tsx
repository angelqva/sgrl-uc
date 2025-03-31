import { getServerSession } from "next-auth";

import FormLogin from "./_components/form";
import UserInfo from "./_components/user-info";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function Page() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return (
      <div className="flex flex-col items-center justify-center">
        <FormLogin />
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <UserInfo
        user={{
          nombreCompleto: (session.user?.nombreCompleto as string) ?? "",
          correo: (session.user?.correo as string) ?? "",
        }}
      />
    </div>
  );
}
