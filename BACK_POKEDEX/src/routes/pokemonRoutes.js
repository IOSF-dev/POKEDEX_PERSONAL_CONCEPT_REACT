const express = require("express");
const { createPokemon, getEveryPokemon, deletePokemon, modifyPokemon, getPokemonByID, toggleAdminPokemon } = require("../controllers/pokemonController.js")
///AQUI tendria que estar la logica del pokemon (userverify, token, edit, getFULLVIEW, disable collection)
const router = express.Router();

router.get("/",/*MIDDLEWARE SI JWT & LOGINOK*/ getEveryPokemon);
router.post("/", /*MIDDLEWARE SI JWT & LOGINOK*/ createPokemon);
router.delete("/:pokeID",/*MIDDLEWARE SI JWT & LOGINOK*/  deletePokemon);
router.patch("/:pokeID",/*MIDDLEWARE SI JWT & LOGINOK*/  modifyPokemon);
router.get("/:pokeID", /*MIDDLEWARE SI JWT & LOGINOK*/ getPokemonByID);
router.post("/collection/:pokeID",/*MIDDLEWARE SI JWT & LOGINOK*/  toggleAdminPokemon);


module.exports = router;