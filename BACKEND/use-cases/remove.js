const {
    getCommentById,
    deleteComment,
} = require("../database/funciones/comment");
const { notFound, unauthorizedUser } = require("../services/errors");
const { getPostById } = require("../database/funciones/post");
const { deletePost } = require("../database/funciones/post");

//Funcion para eliminar un comentario
async function removeComment(commentId, userId) {
    //Obtener el comentario con id "commentId"
    const comment = await getCommentById(commentId);
    if (!comment) {
        notFound();
    }
    //Comparar el id del token (userId) con el userID del comentario
    // Si no son iguales, tirar un error
    if (comment.userId != userId) {
        unauthorizedUser();
    }
    await deleteComment(commentId);
}

//Funcion para eliminar un post
async function removePost(postId, userId) {
    const post = await getPostById(postId);

    if (!post) {
        notFound();
    }

    if (post.userId != userId) {
        unauthorizedUser();
    }
    await deletePost(postId);
}

module.exports = {
    removeComment,
    removePost,
};
