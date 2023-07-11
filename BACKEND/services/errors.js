//Funciones de errores

//invalidCredentials
//Funcion si las credenciales son invalidas
function invalidCredentials() {
    throw {
        status: 400, //Bad Request
        code: "INVALID_CREDENTIALS",
        message: "Las credenciales son inválidas",
    };
}

//emailNotValidated
//Funcion si el email no esta validado
function emailNotValidated() {
    throw {
        status: 400, //Bad Request
        code: "EMAIL_NOT_VALIDATED",
        message: "El email no ha sido validado",
    };
}

//notAuthenticated
//Funcion si el usuario no esta autenticado
function notAuthenticated() {
    throw {
        status: 401,
        code: "NOT_AUTHENTICATED",
        message: "Debe enviar el token en el header 'Authorization'",
    };
}

//unathorizedUser
//Funcion si el usuario no esta autorizado
function unauthorizedUser() {
    throw {
        status: 403, //403 Forbidden
        code: "UNAUTHORIZED",
        message: "El usuario no está autorizado para hacer esta acción",
    };
}

//didNotAcceptTOS
//Funcion si el usuario no acepto las TOS
function didNotAcceptTOS() {
    throw {
        status: 400, //Bad Request
        code: "DID_NOT_ACCEPT_TOS",
        message:
            "El usuario debe aceptar los términos y condiciones para registrarse",
    };
}

//notFound
//Eror 404
function notFound() {
    throw {
        status: 404, //NOT FOUND
        code: "RESOURCE_NOT_FOUND",
        message: "El recurso no existe",
    };
}

//emailAlreadyRegistered
//Funcion si el email ya esta registrado
function emailAlreadyRegistered() {
    throw {
        status: 400, //Bad Request
        code: "EMAIL_ALREADY_REGISTERED",
        message: "El email ya está registrado",
    };
}

//invalidaValidationCode
//Funcion si el codigo no es valido
function invalidValidationCode() {
    throw {
        status: 400, //Bad Request
        code: "INVALID_VALIDATION_CODE",
        message: "El código de validación es inválido",
    };
}

//sendError
//Funcion que manda un error
function sendError(res, err) {
    res.status(err.status ?? 500).json({
        success: false,
        error: {
            code: err.code ?? "UNEXPECTED_ERROR",
            msg: err.message ?? "Ha ocurrido un error inesperado",
        },
    });
}

//handleAsyncError
function handleAsyncError(controllerFn) {
    return async ( req, res, next) => {
        try {
            await controllerFn(req, res);
        } catch (error) {
            next(error);
        }
    };
}

module.exports = {
    invalidCredentials,
    emailNotValidated,
    notAuthenticated,
    unauthorizedUser,
    didNotAcceptTOS,
    notFound,
    emailAlreadyRegistered,
    invalidValidationCode,
    sendError,
    handleAsyncError,
};
