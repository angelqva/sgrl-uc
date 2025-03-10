import NextAuth, { DefaultSession } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

import { LDAP_UC } from "@/lib/ldap";
import { ServiceUserRoles } from "@/services/service.user-roles";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      correo: string;
      nombreCompleto: string;
      roles: string;
    } & DefaultSession["user"];
  }

  interface User {
    id: string;
    correo: string;
    nombreCompleto: string;
    roles: string;
  }
}
export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "LDAP",
      credentials: {
        usuario: {
          label: "Usuario",
          type: "text",
          placeholder: "Entre su Usuario",
        },
        contraseña: {
          label: "Contraseña",
          type: "password",
          placeholder: "Entre su Contraseña",
        },
      },
      async authorize(credentials) {
        if (!credentials?.usuario || !credentials?.contraseña) {
          throw new Error(
            JSON.stringify({
              usuario: "Este campo es obligatorio",
              contraseña: "Este campo es obligatorio",
            }),
          );
        }
        const { errors, data } = await LDAP_UC.autenticarse(
          credentials.usuario,
          credentials.contraseña,
        );

        if (errors) {
          throw new Error(JSON.stringify(errors));
        }

        const dbResponse = await ServiceUserRoles.createUser({ ...data });

        if (!dbResponse.data) {
          if (dbResponse.errores) {
            throw new Error(JSON.stringify(dbResponse.errores));
          }
          throw new Error(
            JSON.stringify({ unhandled: "Error de base de datos" }),
          );
        }

        return { ...dbResponse.data, roles: dbResponse.data.roles.join(",") };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }: { token: any; user?: any }) {
      if (user) {
        token.id = user.id;
        token.correo = user.correo;
        token.nombreCompleto = user.nombreCompleto;
        token.roles = user.roles;
      }

      return token;
    },
    async session({ session, token }: { session: any; token: any }) {
      if (session.user) {
        session.user.id = token.id;
        session.user.correo = token.correo;
        session.user.nombreCompleto = token.nombreCompleto;
        session.user.roles = token.roles;
      }

      return session;
    },
  },
  pages: {
    signIn: "/autenticarse",
  },
  debug: true,
};

export const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
