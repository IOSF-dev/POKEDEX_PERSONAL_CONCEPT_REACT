import { apiConfig } from "./ApiConfig.js";

export async function loginValidation(inputData) {
  try {
    const adminRes = await fetch(`${apiConfig.baseUrl}admin/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(inputData),
    });

    const admin = await adminRes.json();

    if (adminRes.ok) {
      const TRAINER = admin.data;

      const payload = {
        mode: "admin",
        userName: TRAINER.userID,
        collection: TRAINER.adminCollection,
      };

      localStorage.setItem("pdx_user", JSON.stringify(payload));

      return { ok: true, mode: "admin", data: TRAINER };
    }

    const pokeName = inputData.userID.toLowerCase();
    const pokeID = Number(inputData.userPASS);

    const userRes = await fetch(`${apiConfig.baseUrl}pokemon/${pokeID}`);
    const user = await userRes.json();

    if (
      userRes.ok &&
      user.data &&
      user.data.pokeName.toLowerCase() === pokeName
    ) {
      const pokemon = user.data;

      const payload = {
        mode: "pokemon",
        pokeID: pokemon.pokeID,
        pokeName: pokemon.pokeName,
      };

      localStorage.setItem("pdx_user", JSON.stringify(payload));

      return { ok: true, mode: "pokemon", data: pokemon };
    }

    return { ok: false, message: "Usuario o contraseña incorrectos." };
  } catch (error) {
    console.log("Network error:", error);
    return { ok: false, message: error.message };
  }
}
