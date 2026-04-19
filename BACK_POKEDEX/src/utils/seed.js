const mongoose = require("mongoose");
const axios = require("axios");

const Admin = require("../models/admin");
const Pokemon = require("../models/pokemon");

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms)); //delay para que no pete por volumen creo?

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
    await Admin.insertMany([ //podias haber hecho array fuera y meter variable (escalabilidad y clean code) modelo admin
      { userID: "moises@pdx.com", userPASS: "moises123", role: "admin" },
      { userID: "isaac@pdx.com", userPASS: "isaac123", role: "admin" },
      { userID: "alvaro@pdx.com", userPASS: "alvaro123", role: "admin" },
    ]);
    console.log("Admins done");

    console.log("Fetching Pokémon from API...");

    const pokemonsToInsert = []; //variable array vacio primero, ok...

    for (let id = 1; id <= 151; id++) { //bucle for de 151 veces. OK
      console.log(`Fetching Pokémon #${id}`);

      const pokemonUrl = `https://pokeapi.co/api/v2/pokemon/${id}`;
      const speciesUrl = `https://pokeapi.co/api/v2/pokemon-species/${id}`;

      const p = await fetchWithRetry(pokemonUrl);
      const s = await fetchWithRetry(speciesUrl);

      if (!p || !s) {
        console.log(`Saltando Pokémon ${id} por errores`);
        continue;
      }

      const LANG = //IDIOMA ES & EN
        s.flavor_text_entries.find((f) => f.language.name === "es") ||
        s.flavor_text_entries.find((f) => f.language.name === "en");


      const pokeDocument = {  //LO GORDO el modelo pokemon 


        pokeID: id,
        pokeName: p.name,
        pokePass: String(id),

        pokeOverview: {
          description: LANG ? LANG.flavor_text.replace(/\n|\f/g, " ") : "",
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

      pokemonsToInsert.push(pokeDocument); // en el array mete un push del pokedocument(151 veces)

      await delay(400); ///espera entre pushs
    }

    await Pokemon.insertMany(pokemonsToInsert); /// aqui mete el array de 151 objetos (el MAIN DATA) con un .insertMany(DATA) al Schema que responde a "Pokemon"(pokemonSchema)
    console.log("151 Pokémons inserted");

    mongoose.connection.close();
    console.log("Seeder done ");
  } catch (error) {
    console.log("Error during seeding:", error);
    mongoose.connection.close();
  }
}

seed(); //llama a seed
