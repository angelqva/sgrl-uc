"use client";

import {
  ChangeEvent,
  useActionState,
  useEffect,
  useState,
  useTransition,
} from "react";
import {
  Button,
  Input,
  Form,
  Card,
  CardBody,
  Select,
  SelectItem,
  Textarea,
  addToast,
} from "@heroui/react";
import { Icon } from "@iconify/react";
import { useRouter } from "next/navigation";
import { ZodObject } from "zod";
import { Area } from "@prisma/client";

import { saveArea } from "../_action/action.area";

import {
  areaCodigoSchema,
  areaDescripcionSchema,
  areaNombreSchema,
  areaUbicacionSchema,
} from "@/schema/area";

export default function FormArea({ area }: { area?: Area }) {
  const [pending, startTransaction] = useTransition();
  const [state, formAction] = useActionState(saveArea, { slug: area?.slug });
  const [codigo, setCodigo] = useState(area?.codigo ?? "");
  const [nombre, setNombre] = useState(area?.nombre ?? "");
  const [ubicacion, setUbicacion] = useState(area?.ubicacion ?? "");
  const [descripcion, setDescripcion] = useState(area?.descripcion ?? "");
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
  const handleUbicacionChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setUbicacion(event.target.value);
    validateField({
      key: "ubicacion",
      schema: areaUbicacionSchema,
      data: { ubicacion: event.target.value },
    });
  };
  const handleDescriptionChange = (value: string) => {
    setDescripcion(value);
    validateField({
      key: "descripcion",
      schema: areaDescripcionSchema,
      data: { descripcion: value },
    });
  };
  const handleNombreChange = (value: string) => {
    setNombre(value);
    validateField({
      key: "nombre",
      schema: areaNombreSchema,
      data: { nombre: value },
    });
  };
  const handleCodigoChange = (value: string) => {
    setCodigo(value);
    validateField({
      key: "codigo",
      schema: areaCodigoSchema,
      data: { codigo: value },
    });
  };
  const handleActionFormData = () => {
    const formData = new FormData();

    console.log({ codigo, nombre, ubicacion, descripcion });
    Object.entries({ codigo, nombre, ubicacion, descripcion }).forEach(
      ([key, value]) => {
        formData.append(key, value);
      },
    );

    return startTransaction(() => formAction(formData));
  };

  useEffect(() => {
    console.log(state);
    if (state.type) {
      if (state.fields) {
        setCodigo(state.fields["codigo"]);
        setNombre(state.fields["nombre"]);
        setUbicacion(state.fields["ubicacion"]);
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
          router.push(`/panel/gestionar/areas/${state.area?.slug}`);
        } else {
          addToast({
            title: "Notificación de Éxito",
            description: "Creado Satisfactoriamente",
            color: "success",
          });
          router.push(`/panel/gestionar/areas`);
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
              Área Formulario
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
