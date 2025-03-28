"use client";

import { addToast } from "@heroui/react";
import { useEffect, useRef } from "react";

import { deleteCookie } from "@/app/(dashboard)/panel/gestionar/areas/_actions/action";

export default function FeedBack({ feedback }: { feedback: string }) {
  const hasRun = useRef(false);

  useEffect(() => {
    if (feedback && !hasRun.current) {
      hasRun.current = true;
      try {
        const parsed = JSON.parse(feedback) as Record<string, string>;

        addToast({
          title: "Notificación",
          description: parsed.message ?? "",
          color:
            (parsed.type as
              | "foreground"
              | "default"
              | "primary"
              | "secondary"
              | "success"
              | "warning"
              | "danger"
              | undefined) ?? "foreground",
        });
      } catch (error) {
        addToast({
          title: "Notificación de error",
          description: feedback,
          color: "foreground",
        });
      }
      try {
        deleteCookie("feedback").catch(console.error);
      } catch (error) {}
    }
  }, [feedback]);

  return null;
}
