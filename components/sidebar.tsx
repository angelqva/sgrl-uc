import { Icon } from "@iconify/react";
import NextLink from "next/link";

export default function Sidebar() {
  return (
    <aside className="fixed p-5 shadow-lg shadow-secondary-500 rounded-xl bg-secondary-500 top-4 left-4 bottom-4">
      <NextLink
        className="flex flex-col items-center justify-start gap-1"
        href="/"
      >
        <Icon className="w-12 h-12 text-white" icon="solar:calendar-outline" />
        <p className="font-bold text-white">SGRL</p>
      </NextLink>
    </aside>
  );
}
