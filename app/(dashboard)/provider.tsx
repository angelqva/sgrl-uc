"use client";

import { ReactNode } from "react";
import { SessionProvider } from "next-auth/react";

export default function StoreProvider({ children }: { children: ReactNode }) {
  return <SessionProvider>{children}</SessionProvider>;
}
