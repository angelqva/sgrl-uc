import { z } from "zod";

// Define the schema for environment variables
export const schemaVariablesEntorno = z.object({
  LDAP_URL: z.string().url(),
  LDAP_DOMAIN: z.string(),
  CATALAGO: z.string(),
  DN: z.string(),
  LDAP_ADMIN: z.string(),
  LDAP_PASSWORD: z.string(),
  SECRET: z.string(),
  PRODUCTION: z.union([z.literal("0"), z.literal("1")]).default("0"), // Ensures it's "0" or "1"
  AUTH_SECRET: z.string(),
  DATABASE_URL: z.string().url(),
});
