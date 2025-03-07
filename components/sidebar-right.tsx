"use client";
import { Icon } from "@iconify/react";
import { Button } from "@heroui/react";
import { useSession } from "next-auth/react";

import ActiveLink from "./active-link";

import { useSidebarRightStore } from "@/store/aside-right";
import { cn } from "@/lib/utils";
export default function SidebarRight() {
  const { isOpen, toggleSidebar } = useSidebarRightStore();
  const { data: session } = useSession();
  const getUserName = () => {
    if (session?.user.correo) {
      const [name, _] = session?.user.correo.split(".");

      return name + " Perfil";
    } else {
      return "Perfil";
    }
  };

  return (
    <aside
      className={cn(
        "fixed shadow-lg shadow-secondary-500 rounded-xl rounded-tl-none bg-secondary-500 top-4 right-0 bottom-4 transition-all delay-100 duration-300 ease-soft-spring z-50",
        isOpen ? "-translate-x-4" : "translate-x-full",
      )}
    >
      <div
        className={cn(
          "absolute top-0 left-0 z-50 flex -translate-x-full transition-all duration-300 ease-linear",
        )}
      >
        <Button
          isIconOnly
          aria-label="Toggle User Menu"
          className="rounded-tr-none rounded-br-none"
          color="secondary"
          onPress={toggleSidebar}
        >
          <Icon
            className="w-8 h-8"
            icon={isOpen ? "solar:login-3-bold" : "solar:logout-3-bold"}
          />
        </Button>
      </div>

      <div className="flex flex-col w-full h-full gap-5 p-5 overflow-y-auto">
        <ActiveLink
          className="flex flex-col items-center justify-start gap-1 p-1 rounded-md"
          exact={true}
          href="/panel/usuario/perfil"
        >
          <Icon
            className="w-12 h-12 text-white"
            icon="solar:user-id-bold-duotone"
          />
          <p className="font-bold text-white capitalize">{getUserName()}</p>
        </ActiveLink>
        <hr />
        <ActiveLink
          className="flex flex-col items-center justify-start gap-1 p-1 rounded-md"
          href="/panel/usuario/ordenes"
        >
          <Icon
            className="w-10 h-10 text-white"
            icon="solar:clipboard-list-bold-duotone"
          />
          <p className="font-bold text-white">Ordenes</p>
        </ActiveLink>
        <hr />
        <ActiveLink
          className="flex flex-col items-center justify-start gap-1 p-1 rounded-md"
          href="/panel/usuario/notificaciones"
        >
          <Icon
            className="w-10 h-10 text-white"
            icon="solar:bell-bold-duotone"
          />
          <p className="font-bold text-white">Notificaciones</p>
        </ActiveLink>
      </div>
    </aside>
  );
}
