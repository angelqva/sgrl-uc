// import NextAuth from "next-auth";
// import CredentialsProvider from "next-auth/providers/credentials";
// import { PrismaAdapter } from "@next-auth/prisma-adapter";

// import prisma from "@/lib/prisma";

// export const authOptions = {
//   adapter: PrismaAdapter(prisma),
//   providers: [
//     CredentialsProvider({
//       name: "LDAP",
//       credentials: {
//         correo: {
//           label: "Correo",
//           type: "email",
//           placeholder: "correo@reduc.edu.cu",
//         },
//         contraseña: { label: "Contraseña", type: "password" },
//       },
//       async authorize(credentials) {
//         if (!credentials?.correo || !credentials?.contraseña) {
//           throw new Error("Debe proporcionar credenciales válidas");
//         }

//         // Si no existe en Prisma, guardarlo

//         return user; // Devolver el usuario autenticado
//       },
//     }),
//   ],
//   callbacks: {
//     async session({ session, user }) {
//       if (session.user) {
//         session.user.id = user.id;
//         session.user.role = user.role; // 🚀 Agregar el rol del usuario a la sesión
//       }

//       return session;
//     },
//   },
//   pages: {
//     signIn: "/autenticarse",
//   },
// };

// export const handler = NextAuth(authOptions);
// export { handler as GET, handler as POST };
