const express = require("express");
const { loginAdmin } = require("../controllers/loginValidation.js");

const router = express.Router();

router.post("/login", loginAdmin);

module.exports = router;
