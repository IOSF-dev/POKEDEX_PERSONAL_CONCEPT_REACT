# migrando proyecto backend a molotica estructura

veo que faltan JWT y bryp no veo payload tampoco ni uso de middlewares ni admin ni token
veo ruta rara de admin/login sin logica
ruta pokemon muy cargada
controlador pokemon cargado
modelos admin vagos
seed MUY OK
## TODO:
-middleware isLogged(localstorage("pdx_user"))
-JWT
-BCRYPTO.hash
-admin controller - pokemon controller - auth controller
-test out or fix
- utils folder 
 missing dependencies .json mirar (  "dependencies": {
    "bcrypt": "^6.0.0",
    "cors": "^2.8.6",
    "dotenv": "^17.3.1",
    "express": "^5.2.1",
    "jsonwebtoken": "^9.0.3",
    "mongoose": "^9.2.1",
    "nodemailer": "^8.0.1"
  },)