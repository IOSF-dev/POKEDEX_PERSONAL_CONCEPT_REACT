const express = require("express");
const Test = require("../models/Test.js");
///me reservo el comentariio...todo delete
const router = express.Router();

router.get("/serverTest", (req, res) => {
  res.send("Hola gente que tal");
});
router.get("/MongoCrear-test", async (req, res) => {
  const doc = await Test.create({ message: "Hola Mongo local" });
  res.json(doc);
});

router.get("/info", (req, res) => {
  const dataUser = {
    nombre: "Moises",
    edad: 34,
    curso: "NodeJS",
  };
  res.send(
    JSON.stringify({
      status: "success",
      data: dataUser,
    })
  );
});

module.exports = router;
