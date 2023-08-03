const { Router, json } = require("express");
const { authGuard } = require("../middlewares/auth-guard.js");
const { handleAsyncError } = require("../services/errors.js");
const { addComment } = require("../use-cases/add.js");
const { editComment } = require("../use-cases/edit.js");
const { removeComment } = require("../use-cases/remove.js");
const { sendResponse } = require("../services/response.js");
const { validateBody } = require("../middlewares/validate-body.js");
const commentPayload = require("../validators/comment.js")
const router = Router();


// Agregar un nuevo comentario al post
router.post(
    "/posts/:id/comments",
    authGuard,
    json(),
    validateBody(commentPayload),
    handleAsyncError(async (req, res) => {
        //Agregar un nuevo comentario al post con id req.params.id
        await addComment(req.params.id, req.currentUser.id, req.body);
        sendResponse(res, undefined, 201);
    })
);

// Modificar el comentario
router.put(
    "/posts/:id/comments/:commentId",
    authGuard,
    json(),
    validateBody(commentPayload),
    handleAsyncError(async (req, res) => {
        //Modificar el comentario con id req.params.commentId en el post con id req.params.id
        await editComment(req.params.commentId, req.currentUser.id, req.body);
        sendResponse(res);
    })
);

// Borrar el comentario
router.delete(
    "/posts/:id/comments/:commentId",
    authGuard,
    handleAsyncError(async (req, res) => {
        //Borrar el comentario con id req.params.commentId en el post con id req.params.id
        await removeComment(req.params.commentId, req.currentUser.id);
        sendResponse(res);
    })
);

module.exports = router;
