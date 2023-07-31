const { Router, json } = require("express");
const { authGuard } = require("../middlewares/auth-guard.js");
const { validateBody } = require("../middlewares/validate-body.js");
const { validateEmailCode } = require("../use-cases/validate-email.js");
const { handleAsyncError } = require("../services/errors.js");
const { registerUser } = require("../use-cases/register.js");
const { loginUser } = require("../use-cases/login.js");
const { sendResponse } = require("../services/response.js");
const registerPayload = require("../validators/register.js");
const loginPayload = require("../validators/login.js");
const codePayload = require("../validators/code.js");
const editUserPayload = require("../validators/edit-user.js");
const { editUser } = require("../use-cases/edit");
const { viewUser } = require("../use-cases/view-details.js");
const fileUpload = require("express-fileupload");
const router = Router();

//Registrar un usuario
router.post(
    "/users/register",
    json(),
    validateBody(registerPayload),
    handleAsyncError(async (req, res) => {
        await registerUser(req.body);
        sendResponse(res);
    })
);

//Validar el email
router.post(
    "/users/validate-email",
    json(),
    validateBody(codePayload),
    handleAsyncError(async (req, res) => {
        const { email, code } = req.body;
        await validateEmailCode(email, code);
        sendResponse(res);
    })
);

//Logearse, devuelve un token
router.post(
    "/users/login",
    json(),
    validateBody(loginPayload),
    handleAsyncError(async (req, res) => {
        //Loguea el usuario y devuelve un token de login
        const { email, password } = req.body;
        const token = await loginUser(email, password);
        sendResponse(res, {
            token,
        });
    })
);

//Obtener el usuario con su galeria
router.get(
    "/users/:id",
    handleAsyncError(async (req, res) => {
        // Obtener el post con id req.params.id
        const user = await viewUser(req.params.id);
        sendResponse(res, user);
    })
);

//Modificar datos de usuario
router.patch(
    "/users",
    authGuard,
    validateBody(editUserPayload),
    fileUpload(),
    handleAsyncError(async (req, res) => {
        // Editar el post con id req.params.id
        await editUser(req.currentUser.id, req.body, req.files);
        sendResponse(res);
    })
);
module.exports = router;
