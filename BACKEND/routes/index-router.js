//Todas las rutas en un unico index
const { Router } = require("express");
const commentsRouter = require("./comments-router.js");
const likesRouter = require("./likes-router.js");
const postsRouter = require("./posts-router.js");
const usersRouter = require("./users-router");
const router = Router();

router.use(commentsRouter);
router.use(likesRouter);
router.use(postsRouter);
router.use(usersRouter);

module.exports = router;
