import { apiConfig } from "./ApiConfig.js";
import {saveSession } from "./sessions.js"



export const login = async (inputData) => {
  try {
    const adminRes = await fetch(`${apiConfig.login}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(inputData),
    });

    const admin = await adminRes.json();

    if (adminRes.ok) {
      const ADMIN = admin.data;
      const payload = {
        mode: "admin",
        userName: ADMIN.userID,
        collection: ADMIN.adminCollection,
      };

      saveSession(payload);
      return payload;
    }

    const pokeName = inputData.userID.toLowerCase();
    const pokeID = Number(inputData.userPASS);
    const pokemonRes = await fetch(`${apiConfig.baseUrl}pokemon/${pokeID}`);
    const pokemon = await pokemonRes.json();

    if (
      pokemonRes.ok &&
      pokemon.data &&
      pokemon.data.pokeName.toLowerCase() === pokeName
    ) {
      const pokemon = pokemon.data;

      const payload = {
        mode: "pokemon",
        pokeID: pokemon.pokeID,
        pokeName: pokemon.pokeName,
      };

      saveSession(payload);
    return payload;
    }

    return { ok: false, message: "Usuario o contraseña incorrectos." };
  } catch (error) {
    console.log("Network error:", error);
    return { ok: false, message: error.message };
  }
}

export const logout = ()=> {
  localStorage.removeItem("pokedex_auth");
  localStorage.removeItem("pdx_user");
}