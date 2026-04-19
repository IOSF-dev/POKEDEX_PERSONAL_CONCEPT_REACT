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
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const verifyAdmin = (req, res, next) => {
    try {
        const { role } = req.payload;
        if (role !== "admin") return res.status(401).send({ status: "Failed", message: "credenciales invalidas" });
        next();
    } catch (error) {
        return res.status(401).send({ status: "Failed", message: "Admin required" });
    }

}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////7
const verifyUserPermissions = async (req, res, next) => {
    try {
        const { _id: idUserPermited, role: roleAdmin } = req.payload;
        const { idUser } = req.params;
        if (idUserPermited === idUser || roleAdmin === "admin")
            next();
        else {
            return res.status(403).send({ status: "Failed", message: "you not have privilages" })
        }
    } catch (error) {
        return res.status(401).send({ status: "Failed", message: error.message });
    }
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
module.exports = { verifyToken, verifyAdmin, verifyUserPermissions };