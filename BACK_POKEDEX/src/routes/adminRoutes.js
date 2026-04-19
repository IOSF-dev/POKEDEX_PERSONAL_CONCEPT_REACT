const express = require("express");

const { getEveryPokemon, createPokemon, deletePokemon, modifyPokemon, getPokemonByID, toggleAdminPokemon } = require("../controllers/pokemonController.js");
///esto esta mal la logica de negocio

////aqui tendria que ir las rutas del administrador-crear-borra-editar-collection-verifyMiddlewares signingUp
const router = express.Router();


router.get("/",/*MIDDLEWARE SI JWT & LOGINOK*/ getEveryPokemon);
router.post("/", /*MIDDLEWARE SI JWT & LOGINOK*/ createPokemon);
router.delete("/:pokeID",/*MIDDLEWARE SI JWT & LOGINOK*/  deletePokemon);
router.patch("/:pokeID",/*MIDDLEWARE SI JWT & LOGINOK*/  modifyPokemon);
router.get("/:pokeID", /*MIDDLEWARE SI JWT & LOGINOK*/ getPokemonByID);
router.post("/collection/:pokeID",/*MIDDLEWARE SI JWT & LOGINOK*/  toggleAdminPokemon);
module.exports = router;
