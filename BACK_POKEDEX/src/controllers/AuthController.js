const bcrypt = require("bcrypt"); // llamo a la libreria bcrypt
const BCRYPT_ROUNDS = Number(process.env.BCRYPT_ROUNDS || 10); /// llamo a la variable de entorno 
const PokemonModel = require("../models/pokemonModel.js");  //// llamo al modelo de usuario
const generateToken = require("../utils/authToken");



/////////////////////////////////////////////////////////////////////////////////////////////////////////
const signupController = async (req, res) => { ////revisada en potman (ok)
  try {
    const { name, lastName, email, password } = req.body; /// destructuring del body
    if (!name || !lastName || !email || !password) { ///comprobacion de que los datos del body estan presentes
      return res.status(400).send(" no hay usuario a registrar");
    }
    const newUser = {  /// creamos la variable del nuevo usuario con la contraseña encriptada
      name,
      lastName,
      email,
      password: await bcrypt.hash(password, BCRYPT_ROUNDS),  //contraseña encriptada por bcrypt con la funcion nativa de .HASH!!! IMPORTANTE
    };
    const user = await AdminModel.create(newUser); /// usuario es = a la creacion(create) del newUser usando el modelo de userModel
    if (!user) return res.status(400).send("no hay usuario a registrar"); /// comprobacion del user o no user esa es la cuestion
    /////nodemailer aqui///////
    const returnUser = {
      name: user.name,
      lastName: user.lastName,
      email: user.email,
      role: user.role
    }
    res.status(201).send({ status: "Success", data: returnUser }); /// respuesta positiva con retorno del user en data
  } catch (error) {
    res.status(500).send({ status: "Failed", error: error.message });
  }
};
///////////////////////////////////////////////////////////////////////////////////////////////
const loginController = async (req, res) => { ////revisada en potman (NO-ok)
  try {
    const { email, password } = req.body; /// destructuring del body
    if (!email || !password) return res.status(400).send("Faltan credenciales")
    const login = await userModel.findOne({email: email}).select("name lastName email password role isActive"); ///.select("campo1 campo2")Le dice a Mongoose: “del documento encontrado, solo tráeme estos campos”.

if (!login) {return res.status(401).send("Credenciales incorrectas");}
    const validatePassword = await bcrypt.compare(password, login.password) ////IMPORTANTE, aqui se compara el password(contraseña encriptada) y el login.password (contraseña plana)
if (!validatePassword) {return res.status(401).send("Credenciales incorrectas");} // comprobacion de no password
if(!login.isActive){ return res.status(404).send({status: "Failed", message: "Usuario desabilitado temporalmente"})}

    const userData = {
      name: login.name,
      lastName: login.lastName,
      email: login.email,
      role: login.role,
    }; ///creo una cosntante con los datos de la respuesta
/////-----------------------------ZONA JWT--------------------------------------------------------------------------
    const payload = {
      _id: login._id,
      name: login.name,
      role: login.role,
    }
    const token = generateToken(payload, false);
    const refresh_token = generateToken(payload, true);

    res.status(200).send({ status: "Success", data: userData, token, refresh_token}); ///doy respuesta positiva con userData y 2 tokens
  } catch (error) {
    res.status(500).send({ status: "Failed", error: error.message });
  }
};
///////////////////////////////////////////////////////////////////////////////////////////////
const getTokenController = async (req, res) => {  
  try {
    const payload = {
      _id: req.payload._id,
      name: req.payload.name,
      role: req.payload.role,
    };

    const token = generateToken(payload, false);
    //const refresh_token = generateToken(payload, true);

    res.status(200).send({status: "Success", token})
  } catch (error) {
    res.status(500).send({ status: "Failed", error: error.message });
  }
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////////////
module.exports = { signupController, loginController, getTokenController };  //exportamos los modulos
