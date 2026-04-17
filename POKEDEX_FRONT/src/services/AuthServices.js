import { loginValidation } from "./loginValidation.js";

export async function login(credentials) {
  // Reutilizamos la validacion heredada del frontend antiguo.
  const result = await loginValidation(credentials);

  if (!result.ok) {
    throw new Error(result.message || "Login fallido");
  }

  return result;
}

export function logout() {
  localStorage.removeItem("pokedex_auth");
  localStorage.removeItem("pdx_user");
}
