"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

type ActiveLinkProps = {
  href: string;
  children: React.ReactNode;
  className?: string;
  activeClassName?: string;
  exact?: boolean; // Optional prop for exact match
};

export default function ActiveLink({
  href,
  children,
  className = "",
  activeClassName = "ring-2 ring-white",
  exact = false,
}: ActiveLinkProps) {
  const pathname = usePathname();

  // Check for exact match or partial match if not exact
  const isActive = exact ? pathname === href : pathname.startsWith(href);

  return (
    <Link className={cn(className, isActive && activeClassName)} href={href}>
      {children}
    </Link>
  );
}
