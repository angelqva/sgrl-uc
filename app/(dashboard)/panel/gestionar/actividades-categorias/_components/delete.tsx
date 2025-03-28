"use client";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  addToast,
} from "@heroui/react";
import { useActionState, useEffect, useTransition } from "react";
import { Icon } from "@iconify/react";
import { ActividadCategoria } from "@prisma/client";

import { deleteCategoria } from "../_actions/action";

export default function ModalDeleteActividadCategoria({
  categoria,
}: {
  categoria: ActividadCategoria;
}) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [pending, startTransaction] = useTransition();
  const [state, formAction] = useActionState(deleteCategoria, {});
  const handleConfirmar = () => {
    const formData = new FormData();

    formData.append("slug", categoria.slug);

    return startTransaction(() => formAction(formData));
  };

  useEffect(() => {
    if (state.toast) {
      addToast({
        title: "Notificación de error",
        description: state.toast,
        color: "danger",
      });
    }
  }, [state.toast]);

  return (
    <>
      <Button
        className="text-lg w-full max-w-xs py-7 font-semibold"
        color="danger"
        isLoading={pending}
        startContent={
          !pending && (
            <Icon
              className="w-8 h-8"
              icon="solar:trash-bin-minimalistic-bold"
            />
          )
        }
        variant="ghost"
        onPress={onOpen}
      >
        Eliminar
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>
                <h3 className="text-2xl font-medium text-danger-700">
                  Eliminar {categoria.nombre}
                </h3>
              </ModalHeader>
              <ModalBody>
                <p className="text-lg">
                  Está seguro que desea eliminar este contenido
                </p>
              </ModalBody>
              <ModalFooter>
                <Button color="default" variant="ghost" onPress={onClose}>
                  No, Cancelar
                </Button>
                <Button
                  color="danger"
                  onPress={() => {
                    handleConfirmar();
                    onClose();
                  }}
                >
                  Si, Eliminar
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
