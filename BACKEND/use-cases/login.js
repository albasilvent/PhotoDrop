const { invalidCredentials, emailNotValidated } = require("../services/errors");
const { getUserByEmail } = require("../database/funciones/users");
const { getPassword } = require("../database/funciones/users");
const { validatePassword } = require("../services/crypto");
const { generateJWT } = require("../services/JWT");

//Funcion de login
async function loginUser(email, plainPassword) {
    //obtengo el usuario que corresponda a ese email.
    const user = await getUserByEmail(email);
    //si no tengo un usuario, tiro un error ("las credenciales son invalidas")
    if (!user) {
        invalidCredentials();
    }
    //si el usuario no validó el email tiro error ("falta validar el email")
    if (!user.emailValidated) {
        emailNotValidated();
    }

    const password = await getPassword(email);

    //valido la plainPassword contra el hash
    const valid = await validatePassword(plainPassword, password.password);
    //si no es válida, tiro un error ("las credenciales son invalidas")
    if (!valid) {
        invalidCredentials();
    }
    //GENERAR EL TOKEN (JWT)
    const token = generateJWT({
        id: user.id,
        email: user.email,
        name: user.name,
    });
    //DEVUELVO EL TOKEN
    return token;
}

module.exports = { loginUser };
