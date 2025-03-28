"use client";

import { useActionState, useEffect, useState, useTransition } from "react";
import {
  Button,
  Input,
  Form,
  Card,
  CardBody,
  Textarea,
  addToast,
} from "@heroui/react";
import { Icon } from "@iconify/react";
import { useRouter } from "next/navigation";
import { ZodObject } from "zod";
import { ActividadCategoria } from "@prisma/client";

import { saveCategoria } from "../_actions/action";

import {
  actividadCategoriaDescripcionSchema,
  actividadCategoriaIconoSchema,
  actividadCategoriaNombreSchema,
} from "@/schema/actividad-categoria";

export default function FormActividadCategoria({
  categoria,
}: {
  categoria?: ActividadCategoria;
}) {
  const [pending, startTransaction] = useTransition();
  const [state, formAction] = useActionState(saveCategoria, {
    slug: categoria?.slug,
  });
  const [nombre, setNombre] = useState(categoria?.nombre ?? "");
  const [icono, setIcono] = useState(categoria?.icono ?? "");
  const [descripcion, setDescripcion] = useState(categoria?.descripcion ?? "");
  const [errors, setErrors] = useState<Record<string, string | string[]>>({});
  const router = useRouter();
  const validateField = ({
    key,
    schema,
    data,
  }: {
    key: string;
    schema: ZodObject<any>;
    data: Record<string, unknown>;
  }) => {
    const { [key]: _, ...restErrors } = errors;
    const parsed = schema.safeParse(data);
    let fieldErrors = {};

    if (!parsed.success) {
      fieldErrors = parsed.error.formErrors.fieldErrors;
    }
    setErrors({
      ...restErrors,
      ...(fieldErrors as Record<string, string | string[]>),
    });
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
  const handleIconoChange = (value: string) => {
    setIcono(value);
    validateField({
      key: "icono",
      schema: actividadCategoriaIconoSchema,
      data: { icono: value },
    });
  };
  const handleDescriptionChange = (value: string) => {
    setDescripcion(value);
    validateField({
      key: "descripcion",
      schema: actividadCategoriaDescripcionSchema,
      data: { descripcion: value },
    });
  };
  const handleNombreChange = (value: string) => {
    setNombre(value);
    validateField({
      key: "nombre",
      schema: actividadCategoriaNombreSchema,
      data: { nombre: value },
    });
  };

  const handleActionFormData = () => {
    const formData = new FormData();

    Object.entries({ nombre, icono, descripcion }).forEach(([key, value]) => {
      formData.append(key, value);
    });

    return startTransaction(() => formAction(formData));
  };

  useEffect(() => {
    if (state.type) {
      if (state.fields) {
        setNombre(state.fields["nombre"]);
        setIcono(state.fields["icono"]);
        setDescripcion(state.fields["descripcion"]);
      }
      if (state.errors) {
        setErrors(state.errors);
        if (state.errors.toast) {
          addToast({
            title: "Notificación de error",
            description: state.errors.toast as string,
            color: "danger",
          });
        }
      }
      if (state.type === "success") {
        if (state.slug) {
          addToast({
            title: "Notificación de Éxito",
            description: "Actualizado Satisfactoriamente",
            color: "success",
          });
          router.push(
            `/panel/gestionar/actividades-categorias/${state.categoria?.slug}`,
          );
        } else {
          addToast({
            title: "Notificación de Éxito",
            description: "Creado Satisfactoriamente",
            color: "success",
          });
          router.push(`/panel/gestionar/actividades-categorias`);
        }
      }
    }
  }, [state]);

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
              Categoria Formulario
            </p>
            <p>Complete los siguientes campos</p>
          </div>
          <Form
            action={handleActionFormData}
            className="flex flex-col gap-3"
            validationBehavior="aria"
            validationErrors={errors}
          >
            <Input
              isRequired
              autoComplete="off"
              errorMessage={() => displayErrors("icono")}
              isInvalid={typeof errors["icono"] !== "undefined"}
              label="Icono"
              name="icono"
              placeholder="Complete este campo"
              type="text"
              value={icono}
              variant="bordered"
              onValueChange={handleIconoChange}
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
              value={nombre}
              variant="bordered"
              onValueChange={handleNombreChange}
            />
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
              isLoading={pending}
              size="lg"
              startContent={
                !pending && (
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
