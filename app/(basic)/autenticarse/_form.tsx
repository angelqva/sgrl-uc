"use client";

import { FormEvent, useState } from "react";
import { Button, Input, Form, addToast } from "@heroui/react";
import { Icon } from "@iconify/react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

export default function FormLogin() {
  const [isVisible, setIsVisible] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [errors, setErrors] = useState<Record<string, string | string[]>>({});
  const router = useRouter();

  const toggleVisibility = () => setIsVisible(!isVisible);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSending(true);
    const data = Object.fromEntries(new FormData(event.currentTarget));
    const res = await signIn("credentials", {
      usuario: (data.usuario as string) ?? "",
      contraseña: (data.contraseña as string) ?? "",
      redirect: false,
    });

    setIsSending(false);
    if (!res?.error) {
      addToast({
        title: "Notificación de Éxito",
        description: "Ha autenticado de forma satisfactoria",
        color: "success",
      });
      router.push("/dashboard"); // Redirigir después del login exitoso
    } else {
      if (res.error) {
        const responseErrors = JSON.parse(res.error) as Record<
          string,
          string[] | string
        >;

        if (responseErrors.usuario || responseErrors.contraseña) {
          setErrors({
            usuario: responseErrors.usuario,
            contraseña: responseErrors.contraseña,
          });
          addToast({
            title: "Notificación de Error",
            description: "Verifique los campos con error",
            color: "danger",
          });
        }
        if (responseErrors.toast) {
          addToast({
            title: "Notificación de Error",
            description:
              typeof responseErrors.toast === "string"
                ? responseErrors.toast
                : responseErrors.toast.join(", "),
            color: "danger",
          });
        }
      }
    }
  };

  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="flex flex-col w-full max-w-sm gap-4 rounded-large">
        <div className="flex flex-col items-center pb-6">
          <Icon height="24" icon="solar:calendar-outline" width="24" />
          <p className="text-xl font-medium">
            ¡Hola de nuevo!{" "}
            <span aria-label="emoji" className="ml-2" role="img">
              👋
            </span>
          </p>
          <p className="text-small text-default-500">
            Accede a tu cuenta y sigue aprovechando todos nuestros servicios.
          </p>
        </div>
        <Form
          className="flex flex-col gap-3"
          validationBehavior="native"
          validationErrors={errors}
          onSubmit={handleSubmit}
        >
          <Input
            isRequired
            autoComplete="username"
            label="Usuario"
            name="usuario"
            placeholder="Introduzca su usuario"
            type="text"
            validate={(value) => {
              if (!value) {
                return "El usuario es obligatorio";
              }
              if (value.length < 3) {
                return "El nombre de usuario debe tener al menos 3 caracteres";
              }

              if (value.length > 20) {
                return "El nombre de usuario no puede tener más de 20 caracteres";
              }

              if (!/^[a-zA-Z0-9\.]+$/.test(value)) {
                return "El nombre de usuario solo puede contener letras, números y punto";
              }

              if (/^\d+$/.test(value)) {
                return "El nombre de usuario no puede contener solo números";
              }

              return null; // No hay errores
            }}
            variant="bordered"
          />
          <Input
            isRequired
            autoComplete="current-password"
            endContent={
              <button type="button" onClick={toggleVisibility}>
                {isVisible ? (
                  <Icon
                    className="text-2xl pointer-events-none text-default-400"
                    icon="solar:eye-closed-linear"
                  />
                ) : (
                  <Icon
                    className="text-2xl pointer-events-none text-default-400"
                    icon="solar:eye-bold"
                  />
                )}
              </button>
            }
            label="Contraseña"
            name="contraseña"
            placeholder="Introduzca su contraseña"
            type={isVisible ? "text" : "password"}
            validate={(value) => {
              if (!value) {
                return "La contraseña es obligatoria";
              }

              if (value.length < 7) {
                return "La contraseña debe tener al menos 7 caracteres";
              }

              if (!/[a-z]/.test(value)) {
                return "La contraseña debe contener al menos una letra minúscula";
              }

              if (!/[0-9]/.test(value)) {
                return "La contraseña debe contener al menos un número";
              }

              return null; // No hay errores
            }}
            variant="bordered"
          />

          <Button
            className="w-full"
            color="primary"
            isLoading={isSending}
            size="lg"
            type="submit"
          >
            Autenticarse
          </Button>
        </Form>
      </div>
    </div>
  );
}
