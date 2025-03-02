const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  const roles = [
    "Administrador",
    "Responsable",
    "Directivo",
    "Logístico",
    "Usuario",
  ];
  const user_roles = [
    {
      correo: "angel.napoles@reduc.edu.cu",
      nombres_rol: "Administrador,Responsable,Directivo,Logístico,Usuario",
    },
  ];

  for (const rol of roles) {
    await prisma.rol.upsert({
      where: { nombre: rol },
      update: {}, // No hace nada si ya existe
      create: { nombre: rol }, // Lo crea si no existe
    });
  }
  for (const objUR of user_roles) {
    await prisma.usuarioRolConfig.upsert({
      where: { correo: objUR.correo },
      update: {}, // No hace nada si ya existe
      create: { ...objUR }, // Lo crea si no existe
    });
  }
  console.log("Seeded satisfactoriamente");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
