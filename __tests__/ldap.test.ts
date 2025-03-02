import { LDAP_UC } from "@/lib/ldap";

describe("LDAP Busqueda del DN de Usuario", () => {
  test("Prueba Busqueda exitosa del DN de usuario", async () => {
    const usuario = await LDAP_UC.buscarDN("anapoles");

    console.log(usuario);
    expect(usuario?.length).toBeGreaterThan(0);
  });
  test("Prueba Busqueda no exitosa del DN de usuario", async () => {
    const usuario = await LDAP_UC.buscarDN("aaaaaa");

    expect(usuario).toBeNull();
  });
  test("Prueba autenticación de usuario correcta", async () => {
    const { errors, data } = await LDAP_UC.autenticarse("anapoles", "1q2w3e4r");

    console.log({ errors, data });
    expect(data).toBeDefined();
    expect(errors).toBeUndefined();
  });
});
