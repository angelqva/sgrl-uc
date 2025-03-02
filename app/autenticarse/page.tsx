"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [usuario, setUsuario] = useState("");
  const [contraseña, setContraseña] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await signIn("credentials", {
      usuario,
      contraseña,
      redirect: false,
    });

    if (!res?.error) {
      router.push("/dashboard"); // Redirigir después del login exitoso
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="mb-4 text-2xl font-bold">Iniciar sesión</h1>
      <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
        <input
          className="p-2 border rounded"
          placeholder="Usuario"
          type="text"
          value={usuario}
          onChange={(e) => setUsuario(e.target.value)}
        />
        <input
          className="p-2 border rounded"
          placeholder="Contraseña"
          type="password"
          value={contraseña}
          onChange={(e) => setContraseña(e.target.value)}
        />
        <button className="p-2 text-white bg-blue-500 rounded" type="submit">
          Iniciar sesión
        </button>
      </form>
    </div>
  );
}
