const express = require("express");
const { loginAdmin } = require("../controllers/loginValidation.js");
///esto esta mal la logica de negocio

////aqui tendria que ir las rutas del administrador-crear-borra-editar-collection-verifyMiddlewares signingUp
const router = express.Router();

router.post("/login", loginAdmin);

module.exports = router;
