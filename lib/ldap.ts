import { Client, Entry } from "ldapts";

import CONSTANTS from "@/config/env";
import { ILDAPAutenticarseResponse } from "@/types/ldap";

export class LDAP_UC {
  private static readonly url: string = CONSTANTS.LDAP_URL;
  private static readonly baseDN: string = CONSTANTS.DN;

  static async autenticarse(
    usuario: string,
    contraseña: string,
  ): Promise<ILDAPAutenticarseResponse> {
    let client: Client | undefined = undefined;
    let entries = [] as Entry[];
    let usuarioDN: string | null = null;
    const unbindClient = async () => {
      try {
        if (client) {
          await client.unbind();
        }
      } catch (error) {
        console.log("Unhandled Error", error);
      }
    };

    try {
      client = new Client({ url: LDAP_UC.url });
    } catch (error) {
      console.log("❌  Error de conexión con LDAP:", error);
      await unbindClient();

      return { errors: { conexión: "Error de conexión con LDAP" } };
    }
    if (CONSTANTS.PRODUCTION === "0") {
      usuarioDN = await LDAP_UC.buscarDN(usuario);

      if (!usuarioDN) {
        return {
          errors: {
            usuario: "El usuario no existe.",
          },
        };
      }
    }

    try {
      if (usuarioDN) {
        await client.bind(usuarioDN, contraseña);
      } else {
        const email = usuario.includes("@reduc.edu.cu")
          ? usuario
          : `${usuario}@reduc.edu.cu`;

        await client.bind(email, contraseña);
      }
    } catch (error) {
      console.log("❌ Error de credenciales.", error);
      await unbindClient();

      return { errors: { conexión: "Error de credenciales." } };
    }
    try {
      const { searchEntries } = await client.search(LDAP_UC.baseDN, {
        scope: "sub",
        filter: `(uid=*${usuario}*)`, // Asegúrate de que el atributo "uid" es el correcto en tu LDAP
        timeLimit: 6000,
        attributes: usuarioDN ? ["cn"] : ["displayName", "role"],
      });

      entries = searchEntries.concat();
    } catch (error) {
      console.log("❌  Error de conexión con LDAP:", error);
      await unbindClient();

      return { errors: { conexión: "Error de conexión con LDAP." } };
    }
    await unbindClient();
    if (entries.length === 0) {
      console.log("❌  Error de conexión con LDAP");

      return { errors: { conexión: "Error de conexión con LDAP." } };
    }
    if (usuarioDN) {
      const [{ cn }] = entries;

      if (typeof cn === "string") {
        return {
          data: {
            usuario,
            rol: "Usuario",
            correo: `${usuario}@reudc.edu.cu`,
            nombreCompleto: cn,
          },
        };
      } else {
        return {
          errors: { tipos: `cn: ${cn}` },
        };
      }
    } else {
      const [{ displayName, role }] = entries;

      if (typeof displayName === "string" && typeof role === "string") {
        return {
          data: {
            usuario,
            rol: role,
            correo: `${usuario}@reudc.edu.cu`,
            nombreCompleto: displayName,
          },
        };
      } else {
        return {
          errors: { tipos: `displayName: ${displayName}, role: ${role}` },
        };
      }
    }
  }

  static async buscarDN(usuario: string) {
    let client: Client | undefined = undefined;

    try {
      client = new Client({ url: LDAP_UC.url });
      const { searchEntries } = await client.search(LDAP_UC.baseDN, {
        scope: "sub",
        filter: `(uid=*${usuario}*)`, // Asegúrate de que el atributo "uid" es el correcto en tu LDAP
        timeLimit: 6000,
        attributes: ["dn"],
      });

      if (searchEntries.length === 0) {
        return null;
      }
      const [{ dn }] = searchEntries;

      return dn;
    } catch (err: any) {
      console.error("❌ Authentication failed:", err.message);
    } finally {
      if (client) {
        await client.unbind();
      }
    }

    return null;
  }
}
