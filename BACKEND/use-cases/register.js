const {
    emailAlreadyRegistered,
    didNotAcceptTOS,
} = require("../services/errors");
const { getUserByEmail, saveUser } = require("../database/funciones/users");
const {
    hashPassword,
    generateUUID,
    generateValidationCode,
} = require("../services/crypto");
const { getTimestampMinutesFromNow } = require("../services/time");
const { sendEmail } = require("../services/email");
const { saveValidationCode } = require("../database/funciones/email");

//Funcion para registrar un usuario
async function registerUser(userData) {

    if (!userData.acceptedTOS) {
        didNotAcceptTOS();
    }

    const maybeOldUser = await getUserByEmail(userData.email);
    if (maybeOldUser) {
        emailAlreadyRegistered();
    }

    //hashear la contraseña
    const hashedPassword = await hashPassword(userData.password);

    //generar código de validación
    const randomCode = generateValidationCode();

    //generar el nuevo id de usuario
    const newUserId = generateUUID();

    //guardar el usuario en la db
    const user = {
        ...userData,
        id: newUserId,
        password: hashedPassword,
        emailValidated: false,
    };
    await saveUser(user);

    //guardar el código de validación
    const expirationTimestamp = getTimestampMinutesFromNow(5);
    const validationCode = {
        id: generateUUID(),
        userId: user.id,
        code: randomCode,
        expirationTimestamp,
    };
    await saveValidationCode(validationCode);

    //enviar el mail
    await sendEmail(user.email, user.name, validationCode.code);
}

module.exports = { registerUser };
