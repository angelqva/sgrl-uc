import { Link } from "@heroui/link";
import { button as buttonStyles } from "@heroui/theme";
import { FileUser, LayoutDashboard } from "lucide-react";

import { siteConfig } from "@/config/site";
import { title, subtitle } from "@/components/primitives";

export default function Home() {
  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 my-auto md:py-[100px]">
      <div className="justify-center inline-block max-w-2xl text-center">
        <span className={title()}>Reserva&nbsp;</span>
        <span className={title({ color: "violet" })}>
          rápido y simple&nbsp;
        </span>
        <br className="hidden sm:block" />
        <span className={title()}>
          locales para tus actividades en la universidad.
        </span>
        <div className={subtitle({ class: "mt-4" })}>
          ¡Planifica con confianza y optimiza tu tiempo!
        </div>
      </div>

      <div className="flex flex-col gap-5 sm:flex-row">
        <Link
          className={buttonStyles({
            color: "primary",
            radius: "full",
            variant: "shadow",
          })}
          href="/dashboard"
        >
          <LayoutDashboard /> Panel de Trabajo
        </Link>
        <Link
          isExternal
          className={buttonStyles({
            color: "default",
            radius: "full",
            variant: "bordered",
          })}
          href={siteConfig.links.docs}
        >
          <FileUser /> Manual de Ayuda
        </Link>
      </div>
    </section>
  );
}
