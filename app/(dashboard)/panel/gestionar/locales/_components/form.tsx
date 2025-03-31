"use client";
import { Area, Local } from "@prisma/client";
import { useActionState, useEffect, useState, useTransition, Key } from "react";
import { ZodObject } from "zod";
import {
  addToast,
  Autocomplete,
  AutocompleteItem,
  Button,
  Card,
  CardBody,
  Form,
  Input,
  Textarea,
} from "@heroui/react";
import { Icon } from "@iconify/react";
import { useRouter } from "next/navigation";

import { saveLocal } from "../_actions/action";

import ReusableEmail from "@/components/reusable-email";
import {
  localAreaSchema,
  localCodigoSchema,
  localDescripcionSchema,
  localNombreSchema,
  localResponsablesSchema,
} from "@/schema/local";

export default function FormLocales({
  local,
  areas,
}: {
  local?: Local;
  areas: Area[];
}) {
  const [pending, startTransaction] = useTransition();
  const [state, formAction] = useActionState(saveLocal, {
    codigo: local?.codigo,
  });
  const [responsables, setResponsables] = useState<string[]>(
    local?.responsables.split(";") ?? ([] as string[]),
  );
  const [area, setArea] = useState<string | null | undefined>(local?.areaId);
  const [codigo, setCodigo] = useState(local?.codigo ?? "");
  const [nombre, setNombre] = useState(local?.nombre ?? "");
  const [descripcion, setDescripcion] = useState(local?.descripcion ?? "");
  const [errors, setErrors] = useState<Record<string, string | string[]>>({});
  const router = useRouter();
  const handleDescriptionChange = (value: string) => {
    setDescripcion(value);
    validateField({
      key: "descripcion",
      schema: localDescripcionSchema,
      data: { descripcion: value },
    });
  };
  const handleNombreChange = (value: string) => {
    setNombre(value);
    validateField({
      key: "nombre",
      schema: localNombreSchema,
      data: { nombre: value },
    });
  };
  const handleCodigoChange = (value: string) => {
    setCodigo(value);
    validateField({
      key: "codigo",
      schema: localCodigoSchema,
      data: { codigo: value },
    });
  };
  const handleAreaChange = (key: Key | null) => {
    const areaValue = (key as string) ?? "";

    setArea(areaValue);
    validateField({
      key: "area",
      schema: localAreaSchema,
      data: { area: areaValue },
    });
  };
  const handleActionFormData = () => {
    const formData = new FormData();

    Object.entries({
      codigo,
      nombre,
      responsables: responsables.join(";"),
      descripcion,
      area: (area as string) ?? "",
    }).forEach(([key, value]) => {
      formData.append(key, value);
    });

    return startTransaction(() => formAction(formData));
  };
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
  const handleResponsableChange = (value: string[]) => {
    setResponsables(value);
    validateField({
      key: "responsables",
      schema: localResponsablesSchema,
      data: { responsables: value },
    });
  };

  useEffect(() => {
    console.log(state);
    if (state.type) {
      if (state.fields) {
        const strResponsables = state.fields["responsables"];
        const areaId = state.fields["area"];

        setCodigo(state.fields["codigo"]);
        setNombre(state.fields["nombre"]);
        setResponsables(strResponsables.split(";"));
        setTimeout(() => setArea(areaId), 50);
        setDescripcion(state.fields["descripcion"]);
      }
      if (state.errors) {
        setTimeout(() => setErrors({ ...state.errors }), 50);
        if (state.errors.toast) {
          addToast({
            title: "Notificación de error",
            description: state.errors.toast as string,
            color: "danger",
          });
        }
      }
      if (state.type === "success") {
        if (state.codigo) {
          addToast({
            title: "Notificación de Éxito",
            description: "Actualizado Satisfactoriamente",
            color: "success",
          });
          router.push(`/panel/gestionar/locales/${state.local?.codigo}`);
        } else {
          addToast({
            title: "Notificación de Éxito",
            description: "Creado Satisfactoriamente",
            color: "success",
          });
          router.push(`/panel/gestionar/locales`);
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
              icon="solar:exit-bold-duotone"
            />
            <p className="text-2xl font-medium text-secondary-800">
              Local Formulario
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
              errorMessage={() => displayErrors("codigo")}
              isInvalid={typeof errors["codigo"] !== "undefined"}
              label="Código"
              name="codigo"
              placeholder="Complete este campo"
              type="text"
              value={codigo}
              variant="bordered"
              onValueChange={handleCodigoChange}
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
            <Autocomplete
              defaultItems={areas}
              errorMessage={() => displayErrors("area")}
              isInvalid={typeof errors["area"] !== "undefined"}
              label="Área"
              listboxProps={{
                emptyContent: "No se encontraron elementos.",
              }}
              placeholder="Selecciona un área"
              selectedKey={area}
              variant="bordered"
              onSelectionChange={handleAreaChange}
            >
              {(item) => (
                <AutocompleteItem key={item.id}>{item.nombre}</AutocompleteItem>
              )}
            </Autocomplete>
            <ReusableEmail
              isRequired
              errorMessage={() => displayErrors("responsables")}
              label="Responsables:"
              labelAdd="Agregar correo de Responsable"
              labelDelete="Eliminar correo del Responsable"
              labelInput="Correo del Responsable"
              value={responsables}
              onValueChange={handleResponsableChange}
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
