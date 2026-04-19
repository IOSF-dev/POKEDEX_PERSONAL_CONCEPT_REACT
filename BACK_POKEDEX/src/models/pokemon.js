const mongoose = require("mongoose");
//modelo completo parece IA

//poke id y poke pass...que coño es eso?
const pokemonSchema = new mongoose.Schema({
  pokeID: {
    type: Number,
    required: true,
    unique: true,
  },
  pokeName: {
    type: String,
    required: true,
    unique: true,
  },
  pokePass: {
    type: String,
    required: true,
  },
  pokeOverview: {
    description: { type: String, default: "" },
    height: { type: Number, default: 1 },
    weight: { type: Number, default: 1 },
    base_experience: { type: Number, default: 1 },

    types: { type: [String], default: [] },

    stats: [
      {
        name: { type: String, default: "" },
        base: { type: Number, default: 1 },
      },
    ],

    abilities: { type: [String], default: [] },

    moves: { type: [String], default: [] },

    sprites: {
      front_default: { type: String, default: null },
      front_shiny: { type: String, default: null },
      art_official: { type: String, default: null },
    },
  },
});

module.exports = mongoose.model("Pokemon", pokemonSchema, "pokemons");
