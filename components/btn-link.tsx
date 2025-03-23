"use client";
import { Link, Button } from "@heroui/react";
import { ReactNode } from "react";

import { cn } from "@/lib/utils";

export default function BtnLink({
  children,
  className,
  href,
  icon,
}: {
  children: ReactNode;
  href: string;
  className?: string;
  icon?: ReactNode;
}) {
  return (
    <Button
      as={Link}
      className={cn(className ?? "px-6 py-8 font-semibold text-lg")}
      color="secondary"
      href={href}
      startContent={icon}
    >
      {children}
    </Button>
  );
}
