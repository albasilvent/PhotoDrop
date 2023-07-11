const {
    setEmailValidated,
    getValidationCodeByUserId,
    deleteValidationCode,
} = require("../database/funciones/email.js");
const { getUserByEmail } = require("../database/funciones/users.js");
const { notFound, invalidValidationCode } = require("../services/errors.js");

//Funcion para validar el email
async function validateEmailCode(userEmail, code) {
    const user = await getUserByEmail(userEmail);
    if (!user) {
        notFound();
    }
    const dbCode = await getValidationCodeByUserId(user.id);

    if (dbCode.code != code) {
        invalidValidationCode();
    }
    await deleteValidationCode(dbCode.id);

    await setEmailValidated(user.id);
}

module.exports = {
    validateEmailCode,
};
