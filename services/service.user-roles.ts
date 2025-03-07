import { prisma } from "@/lib/prisma";
import { schemaValidardUsuario, TipoUsuarioLdap } from "@/schema/users";

export class ServiceUserRoles {
  static async createUser(data: TipoUsuarioLdap) {
    let setUserRoles = [] as { usuarioId: string; rolId: string }[];
    const validatedData = schemaValidardUsuario.safeParse(data);

    if (validatedData.success) {
      try {
        const newUser = await prisma.usuario.upsert({
          where: { correo: validatedData.data.correo },
          update: {},
          create: validatedData.data,
        });

        const configUserRoles = await prisma.usuarioRolConfig.findUnique({
          where: {
            correo: newUser.correo,
          },
        });
        const roles = await prisma.rol.findMany();

        if (roles.length === 0) {
          return {
            errores: {
              toast: "Necesita rellenar los roles de la base de datos",
            },
          };
        }
        if (configUserRoles) {
          setUserRoles = configUserRoles.roles
            .split(",")
            .map((el) => ({
              usuarioId: newUser.id,
              rolId: roles.find((rolEl) => rolEl.nombre === el)?.id ?? "",
            }))
            .filter((el) => el.rolId.length > 0);
          console.log(setUserRoles);
        } else {
          const rolUser = roles.find((el) => el.nombre === "Usuario");

          if (rolUser) {
            setUserRoles = [{ usuarioId: newUser.id, rolId: rolUser.id }];
          }
        }
        const tempList = setUserRoles.concat();

        while (tempList.length) {
          const item = tempList.shift();

          if (item) {
            await prisma.usuarioRol.upsert({
              where: {
                usuarioId_rolId: {
                  usuarioId: item.usuarioId,
                  rolId: item.rolId,
                },
              },
              update: {}, // If the record exists, you can update specific fields if needed
              create: {
                usuarioId: item.usuarioId,
                rolId: item.rolId,
              },
            });
          }
        }
        const upsertPromises = setUserRoles.map((role) =>
          prisma.usuarioRol.upsert({
            where: {
              usuarioId_rolId: {
                usuarioId: role.usuarioId,
                rolId: role.rolId,
              },
            },
            update: {}, // If the record exists, you can update specific fields if needed
            create: {
              usuarioId: role.usuarioId,
              rolId: role.rolId,
            },
          }),
        );

        await Promise.all(upsertPromises);
        const userInfo = await prisma.usuario.findUnique({
          where: { id: newUser.id },
          include: {
            roles: {
              include: {
                rol: true,
              },
            },
          },
        });

        if (userInfo) {
          return {
            data: {
              ...userInfo,
              roles: userInfo?.roles.map((el) => el.rol.nombre),
            },
          };
        }

        return {
          errores: {
            toast: "Error de conexión con la db",
          },
        };
      } catch (error) {
        console.log(error);

        return {
          errores: {
            toast: "Error de conexión con la db",
          },
        };
      }
    }

    return {
      errores: {
        ...validatedData.error.formErrors.fieldErrors,
      },
    };
  }
}
