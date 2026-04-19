const JWT = require("jsonwebtoken")/// vamos con el final boss!!!!
const REFRESH_TOKEN = process.env.SECRET_REFRESH_TOKEN; /// refresh token es el proceso de la env secret_refresh_token
const  TOKEN = process.env.SECRET_TOKEN;  /// token es el proceso de la env secret_token

const generateToken = (payload, isRefreshToken) =>{  /// toke se genera con Payload y un booleano
    if(isRefreshToken){ /// si el booleano es true
        return JWT.sign(payload, REFRESH_TOKEN, {  /// si es true (hay token accesss) generame el refresh
            expiresIn: "60min" /// tiempo que caduca
        });
    }
        return JWT.sign(payload, TOKEN, { /// si el booleano es false generame el access token
        expiresIn: "25min"  // tiempo que caduca
    });
    
};

module.exports = generateToken;