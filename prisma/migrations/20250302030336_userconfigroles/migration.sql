/*
  Warnings:

  - You are about to drop the column `nombres_rol` on the `UsuarioRolConfig` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "UsuarioRolConfig" DROP COLUMN "nombres_rol",
ADD COLUMN     "roles" TEXT NOT NULL DEFAULT 'Administrador,Responsable,Directivo,Logístico,Usuario';
