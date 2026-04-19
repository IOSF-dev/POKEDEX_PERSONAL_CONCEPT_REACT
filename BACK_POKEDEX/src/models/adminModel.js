const mongoose = require("mongoose");
///por que se llama admin?





const trainerSchema = new mongoose.Schema({
  ID: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: [true, "el nombre es obligatorio"],
    minlength: [3, "Minimo Ana"],
    maxlength: 30,
  },
  email: {
    type: String,
    required: [true, "email por cojones"],
    unique: [true, "email ya existe"],/// tiene que ser unico (true) por defecto false
    trim: true,

  },
  password: {
    type: String,
    required: [true, "contraseña obligatoria"],
    minlength: [8, "minimo 8 caracteres"], //// a permitido una contraseña de 7 caracteres porque la encriptacion es mas larga de 8
    /// maxlength: [12, "maximo 12"],  DA ERROR AL ENCRIPTAR porque supera los 12 caracteres/// TO FIX //

  },
  favorites: {
    type: [mongoose.Schema.Types.ObjectId], // que almacene ids en array
    ref: "Pokemon",// que provengan de la colecion Pokemon
  },
  role: {
    type: String,
    enum: ["pokemon", "admin"], // solo admite esas dos opciones
    default: "admin", // designar una por defecto

  },
})
//nombre raros de campos pass id- no veo name password-email etc unique 
const adminSchema = new mongoose.Schema({
  userID: {
    type: String,
    required: true,
    unique: true,
    match: /.+@.+\..+/,
  },
  userPASS: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: "admin",
  },
  adminCollection: {
    type: [Number],
    default: [],
  },
});
const TrainerModel = mongoose.model("Trainer", trainerSchema, "trainers");
const AdminModel = mongoose.model("Admin", adminSchema, "admins");
module.exports = { AdminModel, TrainerModel }
