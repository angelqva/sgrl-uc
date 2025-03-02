import {
  Navbar as HeroUINavbar,
  NavbarContent,
  NavbarBrand,
  NavbarItem,
} from "@heroui/navbar";
import { Button } from "@heroui/button";
import { Link } from "@heroui/link";
import NextLink from "next/link";
import { Fingerprint, CalendarDays } from "lucide-react";

import { ThemeSwitch } from "@/components/theme-switch";

export const Navbar = () => {
  return (
    <HeroUINavbar maxWidth="xl" position="sticky">
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand as="li" className="gap-3 max-w-fit">
          <NextLink className="flex items-center justify-start gap-1" href="/">
            <CalendarDays className="sm:w-8 sm:h-8" />
            <p className="text-lg font-bold sm:text-xl text-inherit">SGRL-UC</p>
          </NextLink>
        </NavbarBrand>
      </NavbarContent>
      <NavbarContent className="pl-4" justify="end">
        <ThemeSwitch />
        <NavbarItem className="flex">
          <Button
            as={Link}
            className="text-sm font-normal"
            color="primary"
            href="/autenticarse"
            startContent={<Fingerprint />}
            variant="bordered"
          >
            Autenticarse
          </Button>
        </NavbarItem>
      </NavbarContent>
    </HeroUINavbar>
  );
};
