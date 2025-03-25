"use client";

import { ChangeEvent, FormEvent, useState } from "react";
import {
  Button,
  Input,
  Form,
  Card,
  CardBody,
  Select,
  SelectItem,
  Textarea,
} from "@heroui/react";
import { Icon } from "@iconify/react";
import { useRouter } from "next/navigation";

import {
  validateString,
  validateStringOpcional,
  validateStringRequired,
} from "@/lib/utils";

export default function FormCrearArea() {
  const [isSending, setIsSending] = useState(false);
  const [ubicacion, setUbicacion] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [errors, setErrors] = useState<Record<string, string | string[]>>({});
  const router = useRouter();

  const handleUbicacionChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setUbicacion(event.target.value);
    changeSetErrors(
      "ubicacion",
      validateStringRequired("ubicacion", event.target.value),
    );
  };
  const handleDescriptionChange = (value: string) => {
    setDescripcion(value);
    changeSetErrors(
      "descripcion",
      validateStringOpcional("descripcion", value),
    );
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSending(true);
    const data = Object.fromEntries(new FormData(event.currentTarget));
    const nameErrors = validateString("nombre", data["nombre"] as string);
    const codigoErrors = validateString("codigo", data["codigo"] as string);
    const ubicacionErrors = validateStringRequired("ubicacion", ubicacion);
    const descripcionErrors = validateStringOpcional(
      "descripcion",
      descripcion,
    );
    const newErrors = {
      ...nameErrors,
      ...codigoErrors,
      ...ubicacionErrors,
      ...descripcionErrors,
    };

    setErrors(newErrors);
    console.log(data);
    console.log({ ubicacion });
    if (Object.keys(newErrors).length === 0) {
      await new Promise<void>((res) => setTimeout(res, 1000));
    }
    setIsSending(false);
    // const res = await signIn("credentials", {
    //   usuario: (data.usuario as string) ?? "",
    //   contraseña: (data.contraseña as string) ?? "",
    //   redirect: false,
    // });

    // setIsSending(false);
    // if (!res?.error) {
    //   addToast({
    //     title: "Notificación de Éxito",
    //     description: "Ha autenticado de forma satisfactoria",
    //     color: "success",
    //   });
    //   router.push("/panel"); // Redirigir después del login exitoso
    // } else {
    //   if (res.error) {
    //     const responseErrors = JSON.parse(res.error) as Record<
    //       string,
    //       string[] | string
    //     >;

    //     if (responseErrors.usuario || responseErrors.contraseña) {
    //       // setErrors({
    //       //   usuario: responseErrors.usuario,
    //       //   contraseña: responseErrors.contraseña,
    //       // });
    //       addToast({
    //         title: "Notificación de Error",
    //         description: "Verifique los campos con error",
    //         color: "danger",
    //       });
    //     }
    //     if (responseErrors.toast) {
    //       addToast({
    //         title: "Notificación de Error",
    //         description:
    //           typeof responseErrors.toast === "string"
    //             ? responseErrors.toast
    //             : responseErrors.toast.join(", "),
    //         color: "danger",
    //       });
    //     }
    //   }
    // }
  };
  const displayErrors = (key: string) => {
    const fieldError = errors[key];

    if (typeof fieldError === "string") {
      return (
        <ul>
          <li>{fieldError}</li>
        </ul>
      );
    } else if (Array.isArray(fieldError)) {
      return (
        <ul>
          {fieldError.map((err, i) => (
            <li key={`error-nombre-${i}`}>{err}</li>
          ))}
        </ul>
      );
    }

    return "";
  };
  const changeSetErrors = (
    key: string,
    fieldErrors: Record<string, string[]>,
  ) => {
    const { [key]: _, ...restErrors } = errors;

    if (fieldErrors[key]?.length) {
      restErrors[key] = fieldErrors[key];
    }
    setErrors({
      ...restErrors,
    });
  };

  return (
    <div className="flex items-center justify-center w-full h-full">
      <Card className="w-full max-w-md mx-auto">
        <CardBody className="p-6">
          <div className="flex flex-col items-center pb-6">
            <Icon
              className="w-16 h-16 text-secondary-600"
              icon="solar:streets-map-point-bold-duotone"
            />
            <p className="text-2xl font-medium text-secondary-800">
              Área Formulario
            </p>
            <p>Complete los siguientes campos</p>
          </div>
          <Form
            className="flex flex-col gap-3"
            validationBehavior="aria"
            validationErrors={errors}
            onSubmit={handleSubmit}
          >
            <Input
              isRequired
              autoComplete="off"
              errorMessage={() => displayErrors("codigo")}
              isInvalid={typeof errors["codigo"] !== "undefined"}
              label="Código"
              name="codigo"
              placeholder="Complete este campo"
              type="text"
              variant="bordered"
              onValueChange={(value) => {
                changeSetErrors("codigo", validateString("codigo", value));
              }}
            />
            <Input
              isRequired
              autoComplete="off"
              errorMessage={() => displayErrors("nombre")}
              isInvalid={typeof errors["nombre"] !== "undefined"}
              label="Nombre"
              name="nombre"
              placeholder="Complete este campo"
              type="text"
              variant="bordered"
              onValueChange={(value) => {
                changeSetErrors("nombre", validateString("nombre", value));
              }}
            />
            <Select
              isRequired
              autoComplete="off"
              errorMessage={() => displayErrors("ubicacion")}
              isInvalid={typeof errors["ubicacion"] !== "undefined"}
              label="Ubicación"
              placeholder="Seleccione una ubicación"
              selectedKeys={[ubicacion]}
              variant="bordered"
              onChange={handleUbicacionChange}
            >
              <SelectItem key="Sede Ignacio Agramonte">
                Sede Ignacio Agramonte
              </SelectItem>
              <SelectItem key="Sede José Martí">Sede José Martí</SelectItem>
              <SelectItem key="Sede Manuel Fajardo">
                Sede Manuel Fajardo
              </SelectItem>
            </Select>
            <Textarea
              autoComplete="off"
              errorMessage={() => displayErrors("descripcion")}
              isInvalid={typeof errors["descripcion"] !== "undefined"}
              label="Descripcion"
              labelPlacement="inside"
              placeholder=""
              value={descripcion}
              variant="bordered"
              onValueChange={handleDescriptionChange}
            />
            <Button
              className="w-full font-semibold"
              color="secondary"
              isLoading={isSending}
              size="lg"
              startContent={
                !isSending && (
                  <Icon className="w-7 h-7" icon="solar:database-broken" />
                )
              }
              type="submit"
            >
              Guardar
            </Button>
          </Form>
        </CardBody>
      </Card>
    </div>
  );
}
