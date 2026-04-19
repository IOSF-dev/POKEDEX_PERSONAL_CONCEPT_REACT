const JWT = require("jsonwebtoken");

const verifyToken = (req, res, next) => {   //// next en middleware si procede correcto pasa al controlador
    const token = req.header("auth-token")
    if (!token) return res.status(401).send("Acceso denegado aqui entro")
    try {
        const payload = JWT.verify(token, process.env.SECRET_TOKEN);
        req.payload = payload;
        next();
    } catch (error) {
        try {
            const payload = JWT.verify(token, process.env.SECRET_REFRESH_TOKEN);
            req.payload = payload;
            next();
        } catch (error) {
            res.status(401).send({ status: "Token expired", error: error.message })
        }
    }
}
module.exports = { verifyToken };