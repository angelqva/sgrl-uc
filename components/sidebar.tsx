"use client";
import { Icon } from "@iconify/react";
import { Button } from "@heroui/react";
import { useEffect, useRef } from "react";

import ActiveLink from "./active-link";

import { useSidebarStore } from "@/store/aside";
import { cn } from "@/lib/utils";
export default function Sidebar() {
  const { isOpen, toggleSidebar } = useSidebarStore();
  const refAside = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (
        refAside.current &&
        !refAside.current.contains(event.target as Node)
      ) {
        toggleSidebar();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [isOpen, toggleSidebar]);

  return (
    <aside
      ref={refAside}
      className={cn(
        "fixed w-[162px] shadow-lg shadow-secondary-500 rounded-xl rounded-tl-none bg-secondary-500 top-4 left-0 bottom-4 transition-all delay-100 duration-300 ease-soft-spring z-50",
        isOpen ? "translate-x-12" : "-translate-x-full",
      )}
    >
      <div
        className={cn(
          "absolute top-0 right-0 z-50 flex translate-x-full transition-all duration-300 ease-linear",
          isOpen && "right-[unset] left-0 -translate-x-full",
        )}
      >
        <Button
          isIconOnly
          aria-label="Toggle Menu"
          className={cn(
            isOpen
              ? "rounded-tr-none rounded-br-none"
              : "rounded-tl-none rounded-bl-none",
          )}
          color="secondary"
          onPress={toggleSidebar}
        >
          <Icon
            className="w-8 h-8"
            icon={isOpen ? "solar:logout-3-bold" : "solar:login-3-bold"}
          />
        </Button>
      </div>

      <div className="flex flex-col w-full h-full gap-5 p-5 overflow-y-auto">
        <ActiveLink
          className="flex flex-col items-center justify-start gap-1 p-1 rounded-md"
          exact={true}
          href="/panel"
          tabIndex={isOpen ? 0 : -1}
        >
          <Icon
            className="w-12 h-12 text-white"
            icon="solar:widget-5-bold-duotone"
          />
          <p className="font-bold text-white">Panel</p>
        </ActiveLink>
        <hr />
        <ActiveLink
          className="flex flex-col items-center justify-start gap-1 p-1 rounded-md"
          href="/panel/gestionar"
          tabIndex={isOpen ? 0 : -1}
        >
          <Icon
            className="w-10 h-10 text-white"
            icon="solar:widget-add-bold-duotone"
          />
          <p className="font-bold text-white">Gestionar</p>
        </ActiveLink>
      </div>
    </aside>
  );
}
