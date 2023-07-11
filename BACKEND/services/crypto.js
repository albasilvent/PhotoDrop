const crypto = require("crypto");
const bcrypt = require("bcryptjs");


//Funcion para hashear la contraseña
async function hashPassword(password){
    let hashedPassword = await bcrypt.hash(password, 12)
    return hashedPassword;
}


//Funcion para validar la contraseña
async function validatePassword(password, hash){
    let compare = await bcrypt.compare(password, hash);
    return compare;
}


//Generar un numero para validar emails
function generateValidationCode() {
    let validationCode = crypto.randomInt(100000, 999999);
    return validationCode;
}


//Generar UUID
function generateUUID() {
    let uuid = crypto.randomUUID();
    return uuid;
}

module.exports = {
    hashPassword,
    validatePassword,
    generateValidationCode,
    generateUUID,
};