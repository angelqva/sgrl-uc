import "@/styles/globals.css";
import { Metadata, Viewport } from "next";
import clsx from "clsx";

import { Providers } from "./providers";

import { siteConfig } from "@/config/site";
import { fontSans } from "@/config/fonts";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="es">
      <head />
      <body
        className={clsx(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable,
        )}
      >
        <div className="fixed inset-0 top-0 bottom-0 left-0 right-0 z-0 overflow-hidden">
          <div className="bg-[url('/layout-bg.svg')] bg-cover bg-center h-dvh w-full absolute top-0 left-0" />
          <div className="bg-[url('/layout-bg.svg')] bg-cover bg-center h-dvh w-full scale-[-1] absolute top-0 left-0" />
          <div className="absolute top-0 bottom-0 left-0 right-0 z-10 backdrop-blur-sm" />
        </div>
        <Providers themeProps={{ attribute: "class", defaultTheme: "light" }}>
          {children}
        </Providers>
      </body>
    </html>
  );
}
