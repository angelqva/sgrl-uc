"use client";

import { Icon } from "@iconify/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Breadcrumb() {
  const pathname = usePathname();
  const pathSegments = pathname.split("/").filter(Boolean);

  return (
    <nav
      aria-label="breadcrumb"
      className="flex justify-center w-full pt-1 pb-6 text-gray-600 md:justify-start"
    >
      <ul className="flex flex-wrap items-center justify-center gap-2 px-9 lg:px-0">
        <li>
          <Link
            className="flex flex-row items-center gap-2 text-primary-500 hover:underline"
            href="/"
          >
            <Icon className="w-6 h-6" icon="solar:calendar-outline" />
            SGRL-UC
          </Link>
        </li>
        {pathSegments.map((segment, index) => {
          const href = "/" + pathSegments.slice(0, index + 1).join("/");
          const isLast = index === pathSegments.length - 1;

          return (
            <li key={href} className="flex items-center gap-2">
              <span>/</span>
              {isLast ? (
                <span className="capitalize text-default-500">
                  {decodeURIComponent(segment)}
                </span>
              ) : (
                <Link
                  className="capitalize text-primary-500 hover:underline"
                  href={href}
                >
                  {decodeURIComponent(segment)}
                </Link>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
