const { Router } = require("express");
const fileUpload = require("express-fileupload");
const { authGuard } = require("../middlewares/auth-guard.js");
const { validateBody } = require("../middlewares/validate-body.js");
const postPayload = require("../validators/add-post.js");
const editPostPayload = require("../validators/edit-post.js");
const { handleAsyncError } = require("../services/errors");
const { listPosts } = require("../use-cases/list");
const { search } = require("../use-cases/search");
const { addPost } = require("../use-cases/add");
const { editPost } = require("../use-cases/edit");
const { removePost } = require("../use-cases/remove");
const { viewPost } = require("../use-cases/view-details.js");
const { sendResponse } = require("../services/response");
const router = Router();

//Crear un nuevo post
router.post(
    "/posts",
    authGuard,
    fileUpload(),
    validateBody(postPayload),
    handleAsyncError(async (req, res) => {
        // Crear un nuevo post
        await addPost(req.currentUser.id, req.body, req.files);
        sendResponse(res, undefined, 201);
    })
);

//Obtener todos los post que coincidan con la busqueda
router.get(
    "/posts/search",
    handleAsyncError(async (req, res) => {
        //Obtener todos los posts
        const posts = await search(req.query);
        sendResponse(res, posts);
    })
);

// Obtener un post
router.get(
    "/posts/:id",
    handleAsyncError(async (req, res) => {
        // Obtener el post con id req.params.id
        const post = await viewPost(req.params.id, req.currentUser?.id);
        sendResponse(res, post);
    })
);

//Obtener todos los post
router.get(
    "/posts",
    handleAsyncError(async (req, res) => {
        //Obtener todos los posts
        const posts = await listPosts(req.currentUser?.id);
        sendResponse(res, posts);
    })
);

// Editar el post
router.put(
    "/posts/:id",
    authGuard,
    fileUpload(),
    validateBody(editPostPayload),
    handleAsyncError(async (req, res) => {
        // Editar el post con id req.params.id
        await editPost(req.params.id, req.currentUser.id, req.body);
        sendResponse(res);
    })
);

// borrar un post
router.delete(
    "/posts/:id",
    authGuard,
    handleAsyncError(async (req, res) => {
        //Borrar el post con id req.params.id
        await removePost(req.params.id, req.currentUser.id);
        sendResponse(res);
    })
);

module.exports = router;
