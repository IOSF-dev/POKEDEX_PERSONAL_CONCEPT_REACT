const Admin = require("../models/admin.js");
const Pokemon = require("../models/pokemon.js");

const getEveryPokemon = async (req, res) => {
  try {
    const pokemons = await Pokemon.find().sort({ pokeID: 1 });
    if (!pokemons)
      return res
        .status(500)
        .send({ status: "Failed", message: "Server not gave data" });
    if (pokemons.length === 0)
      return res
        .status(200)
        .send({ status: "Success", message: "There is no pokemons to show" });
    res.status(200).send({ status: "Success", data: pokemons });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createPokemon = async (req, res) => {
  try {
    const { pokeName, pokeOverview } = req.body;
    if (!pokeName)
      return res
        .status(400)
        .send({ status: "Failed", message: "Name for pokemon needed" });
    if (!pokeOverview)
      return res
        .status(400)
        .send({ status: "Failed", message: "Details for pokemon needed" });
    const lastPokemonID = await Pokemon.findOne().sort({ pokeID: -1 });
    const newID = lastPokemonID ? lastPokemonID.pokeID + 1 : 1;
    const newPokemon = new Pokemon({
      pokeID: newID,
      pokeName: pokeName,
      pokePass: String(newID),
      pokeOverview: pokeOverview,
    });
    await newPokemon.save();
    res.status(200).send({ status: "Success", data: newPokemon });
  } catch (error) {
    if (error.code === 11000) {
      const duplicatedName = Object.keys(error.keyValue)[0];

      return res.status(400).send({
        status: "Failed",
        message: `Duplicated value: ${duplicatedName} must be unique.`,
      });
    }
    res.status(500).json({ error: error.message });
  }
};
const deletePokemon = async (req, res) => {
  try {
    const { pokeID } = req.params;
    if (!pokeID)
      return res
        .status(400)
        .send({ status: "Failed", message: "no pokemonID received" });
    const pokemonToDelete = await Pokemon.findOneAndDelete({
      pokeID: Number(pokeID),
    });
    if (!pokemonToDelete)
      return res
        .status(404)
        .send({ status: "Failed", message: "Pokemon not found" });
    res.status(200).send({ status: "Success", data: pokemonToDelete });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const modifyPokemon = async (req, res) => {
  try {
    const { pokeID } = req.params;
    const changes = req.body;
    if (!pokeID) {
      return res.status(400).json({
        status: "Failed",
        message: "No pokemonID received",
      });
    }
    if (!changes || Object.keys(changes).length === 0) {
      return res.status(400).json({
        status: "Failed",
        message: "No parameters to modify",
      });
    }

    const original = await Pokemon.findOne({ pokeID: Number(pokeID) });
    if (!original) {
      return res.status(404).json({
        status: "Failed",
        message: "Pokemon not found",
      });
    }

    const updatedPokemon = JSON.parse(JSON.stringify(original));

    if (changes.pokeName) updatedPokemon.pokeName = changes.pokeName;

    if (changes.pokeOverview) {
      updatedPokemon.pokeOverview = {
        ...updatedPokemon.pokeOverview,
        ...changes.pokeOverview,
      };
    }

    const saved = await Pokemon.findOneAndUpdate(
      { pokeID: Number(pokeID) },
      updatedPokemon,
      { new: true }
    );
    return res.status(200).json({
      status: "Success",
      data: saved,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        status: "Failed",
        message: "Duplicated field",
      });
    }

    return res.status(500).json({ error: error.message });
  }
};

const getPokemonByID = async (req, res) => {
  try {
    const { pokeID } = req.params;
    if (!pokeID)
      return res
        .status(400)
        .send({ status: "Failed", message: "no pokemonID received" });
    if (isNaN(Number(pokeID))) {
      return res
        .status(400)
        .send({ status: "Failed", message: "Param received is not a Number" });
    }
    const pokemonToFind = await Pokemon.findOne({
      pokeID: pokeID,
    });
    if (!pokemonToFind)
      return res
        .status(404)
        .send({ status: "Failed", message: "Pokemon not found" });
    res.status(200).send({ status: "Success", data: pokemonToFind });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const toggleAdminPokemon = async (req, res) => {
  try {
    const { pokeID } = req.params;
    const { userID } = req.body;
    const pokeNum = Number(pokeID);
    if (!userID || !pokeNum)
      return res.status(400).json({
        status: "Failed",
        message: "Missing adminID or pokeID",
      });

    const admin = await Admin.findOne({ userID });
    if (!admin)
      return res.status(404).json({
        status: "Failed",
        message: "Admin not found",
      });

    const existsInDB = await Pokemon.findOne({ pokeID: pokeNum });
    if (!existsInDB)
      return res.status(404).json({
        status: "Failed",
        message: "Pokemon not found in database",
      });

    const isInTeam = admin.adminCollection.includes(pokeNum);

    if (isInTeam) {
      admin.adminCollection = admin.adminCollection.filter(
        (id) => id !== pokeNum
      );
      await admin.save();
      return res.status(200).json({
        status: "Success",
        message: "Pokemon removed from admin team",
        data: admin.adminCollection,
      });
    }

    if (admin.adminCollection.length >= 6) {
      return res.status(400).json({
        status: "Failed",
        message: "Admin team already has 6 Pokemon",
      });
    }
    admin.adminCollection.push(pokeNum);
    await admin.save();

    return res.status(200).json({
      status: "Success",
      message: `Pokemon added to admin team: ${existsInDB.pokeName}`,
      data: admin.adminCollection,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createPokemon,
  getEveryPokemon,
  deletePokemon,
  modifyPokemon,
  getPokemonByID,
  toggleAdminPokemon,
};
