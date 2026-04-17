const mongoose = require("mongoose");
const axios = require("axios");

const Admin = require("./admin");
const Pokemon = require("./pokemon");

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function fetchWithRetry(url, retries = 3) {
  try {
    const res = await axios.get(url);
    return res.data;
  } catch (err) {
    if (retries > 0) {
      console.log(
        `Error al pedir ${url}. Reintentando... (${3 - retries + 1}/3)`
      );
      await delay(1000);
      return fetchWithRetry(url, retries - 1);
    }
    console.log(`Error permanente al pedir ${url}`);
    return null;
  }
}

async function seed() {
  try {
    await mongoose.connect("mongodb://localhost:27017/PDXDB");
    console.log("DB Connected");

    await Admin.deleteMany({});
    await Pokemon.deleteMany({});

    console.log("Pushing admins");
    await Admin.insertMany([
      { userID: "moises@pdx.com", userPASS: "moises123", role: "admin" },
      { userID: "isaac@pdx.com", userPASS: "isaac123", role: "admin" },
      { userID: "alvaro@pdx.com", userPASS: "alvaro123", role: "admin" },
    ]);
    console.log("Admins done");

    console.log("Fetching Pokémon from API...");

    const pokemonsToInsert = [];

    for (let id = 1; id <= 151; id++) {
      console.log(`Fetching Pokémon #${id}`);

      const pokemonUrl = `https://pokeapi.co/api/v2/pokemon/${id}`;
      const speciesUrl = `https://pokeapi.co/api/v2/pokemon-species/${id}`;

      const p = await fetchWithRetry(pokemonUrl);
      const s = await fetchWithRetry(speciesUrl);

      if (!p || !s) {
        console.log(`Saltando Pokémon ${id} por errores`);
        continue;
      }

      const flavor =
        s.flavor_text_entries.find((f) => f.language.name === "es") ||
        s.flavor_text_entries.find((f) => f.language.name === "en");
      const pokeDocument = {
        pokeID: id,
        pokeName: p.name,
        pokePass: String(id),

        pokeOverview: {
          description: flavor ? flavor.flavor_text.replace(/\n|\f/g, " ") : "",
          height: p.height,
          weight: p.weight,
          base_experience: p.base_experience,

          types: p.types.map((t) => t.type.name),

          stats: p.stats.map((st) => ({
            name: st.stat.name,
            base: st.base_stat,
          })),

          abilities: p.abilities.map((a) => a.ability.name),
          moves: p.moves.map((m) => m.move.name),

          sprites: {
            front_default: p.sprites.front_default,
            front_shiny: p.sprites.front_shiny,
            art_official: p.sprites.other["official-artwork"].front_default,
          },
        },
      };

      pokemonsToInsert.push(pokeDocument);

      await delay(400);
    }

    await Pokemon.insertMany(pokemonsToInsert);
    console.log("151 Pokémons inserted");

    mongoose.connection.close();
    console.log("Seeder done ");
  } catch (error) {
    console.log("Error during seeding:", error);
    mongoose.connection.close();
  }
}

seed();
