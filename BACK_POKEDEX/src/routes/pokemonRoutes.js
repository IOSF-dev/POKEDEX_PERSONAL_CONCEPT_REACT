const express = require("express");
const { createPokemon, getEveryPokemon, deletePokemon, modifyPokemon, getPokemonByID, toggleAdminPokemon } = require("../controllers/pokemonController.js")

const router = express.Router();

router.get("/", getEveryPokemon);
router.post("/", createPokemon);
router.delete("/:pokeID", deletePokemon);
router.patch("/:pokeID", modifyPokemon);
router.get("/:pokeID", getPokemonByID);
router.post("/collection/:pokeID", toggleAdminPokemon);


module.exports = router;