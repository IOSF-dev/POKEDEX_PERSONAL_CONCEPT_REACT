import { apiConfig } from "./ApiConfig.js";

export async function loginValidation(inputData) {
  try {
    const adminRes = await fetch(`${apiConfig.baseUrl}admin/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(inputData),
    });

    const adminData = await adminRes.json();

    if (adminRes.ok) {
      const user = adminData.data;

      const payload = {
        mode: "admin",
        userName: user.userID,
        collection: user.adminCollection,
      };

      localStorage.setItem("pdx_user", JSON.stringify(payload));

      return { ok: true, mode: "admin", data: user };
    }

    const pokeName = inputData.userID.toLowerCase();
    const pokeID = Number(inputData.userPASS);

    const pokeRes = await fetch(`${apiConfig.baseUrl}pokemon/${pokeID}`);
    const pokeData = await pokeRes.json();

    if (
      pokeRes.ok &&
      pokeData.data &&
      pokeData.data.pokeName.toLowerCase() === pokeName
    ) {
      const pokemon = pokeData.data;

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
