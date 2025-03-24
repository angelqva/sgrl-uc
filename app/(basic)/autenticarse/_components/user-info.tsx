"use client";
import { Card, CardBody, Link } from "@heroui/react";
import { button as buttonStyles } from "@heroui/theme";
import { LayoutDashboard } from "lucide-react";
import { Icon } from "@iconify/react";

import LogoutButton from "@/components/logout-btn";

export default function UserInfo({
  user,
}: {
  user: { correo: string; nombreCompleto: string };
}) {
  return (
    <div className="flex items-center justify-center w-full h-full">
      <Card className="w-full max-w-md mx-auto">
        <CardBody className="p-6">
          <div className="flex flex-col items-center pb-6">
            <Icon height="60" icon="solar:shield-user-bold" width="60" />
            <p className="mb-4 text-2xl font-medium">¡Bienvenido!</p>
            <p className="mb-2 text-xl font-medium">{user.nombreCompleto}</p>
            <p className="mb-4 font-semibold text-primary-500">{user.correo}</p>
            <p className="px-4 mb-4 text-center">
              Por favor siga el enlace a continuación para acceder al sistema
            </p>
            <Link
              className={buttonStyles({
                color: "primary",
                variant: "shadow",
              })}
              href="/panel"
            >
              <LayoutDashboard /> Panel de Trabajo
            </Link>
            <p className="px-4 my-4 text-center">
              Si desea salir presione el enlace a continuación
            </p>
            <LogoutButton color="primary" variant="bordered">
              Salir del Sistema
            </LogoutButton>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
