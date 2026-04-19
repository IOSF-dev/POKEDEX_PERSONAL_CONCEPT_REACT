const mongoose = require("mongoose");
////PERDONA?! HOLA PRIMER TEST QUE VEO EN MI VIDA....IA fijo
const testSchema = new mongoose.Schema({
  message: String,
});

module.exports = mongoose.model("Test", testSchema);
