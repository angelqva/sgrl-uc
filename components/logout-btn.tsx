"use client";

import { Button } from "@heroui/button";
import { signOut } from "next-auth/react";
import { Icon } from "@iconify/react";
import { ReactNode } from "react";

export default function LogoutButton({
  children,
  color,
  variant,
}: {
  children: ReactNode;
  color?:
    | "warning"
    | "default"
    | "primary"
    | "secondary"
    | "success"
    | "danger";
  variant?:
    | "bordered"
    | "solid"
    | "light"
    | "flat"
    | "faded"
    | "shadow"
    | "ghost";
}) {
  return (
    <Button
      color={color}
      startContent={<Icon height="24" icon="hugeicons:logout-04" width="24" />}
      variant={variant}
      onPress={() => signOut({ callbackUrl: "/" })}
    >
      {children}
    </Button>
  );
}
