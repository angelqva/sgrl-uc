import { getServerSession } from "next-auth";

import FormLogin from "./_form";
import UserInfo from "./_user-info";

import { authOptions } from "@/app/(basic)/api/auth/[...nextauth]/route";

export default async function LoginPage() {
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
