const jwt= require("jsonwebtoken");
require("dotenv").config();

// Creamos la funcion que crea un JWT
function generateJWT (payload){
    let secretKey= process.env.JWT_SECRET;
    let tokenJWT= jwt.sign(payload, secretKey, {
        expiresIn : "7d"
    });
    return tokenJWT;
}

//Creamos la funcion que parsea un token
function parseJWT(token){
    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        return payload;
    } catch {
        return null;
    }
}

module.exports = {
    generateJWT,
    parseJWT
};