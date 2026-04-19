const express = require("express");   /// Libreria de express (hablame en express que si no nome entero)
const router = express.Router(); 

const { verifyToken } = require ("../middlewares/auth")
const { createAccountController, loginAdmin } =require("../controllers/AuthController.js");


//ok postman
router.post("/signup", createAccountController)
//ok postman
router.post("/login", loginAdmin);
//ok postman (genera un nuevo token a partir del token refresh)
/// endpoint para refresh token
router.get("/refresh_token", verifyToken, getTokenController);


 module.exports = router; 