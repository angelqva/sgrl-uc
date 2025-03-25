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
            <Icon
              className="w-16 h-16 text-secondary-600"
              icon="solar:shield-user-bold"
            />
            <p className="mb-4 text-2xl font-bold text-secondary-800">
              ¡Bienvenido!
            </p>
            <p className="mb-2 text-xl font-medium text-secondary-800">
              {user.nombreCompleto}
            </p>
            <p className="mb-4 font-semibold text-secondary-600">
              {user.correo}
            </p>
            <p className="px-4 mb-4 text-center">
              Por favor siga el enlace a continuación para acceder al sistema
            </p>
            <Link
              className={buttonStyles({
                color: "secondary",
                variant: "shadow",
              })}
              href="/panel"
            >
              <LayoutDashboard /> Panel de Trabajo
            </Link>
            <p className="px-4 my-4 text-center">
              Si desea salir presione el enlace a continuación
            </p>
            <LogoutButton color="secondary" variant="bordered">
              Salir del Sistema
            </LogoutButton>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
