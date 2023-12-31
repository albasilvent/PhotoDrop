const {
    getCommentById,
    updateComment,
} = require("../database/funciones/comment");
const { updateUser, getUserById } = require("../database/funciones/users");
const { getPostById, updatePost } = require("../database/funciones/post");
const { notFound, unauthorizedUser } = require("../services/errors");
const { processUploadedPostPhoto } = require("../services/images");

//Editar los datos de usuario
async function editUser(userId, userPayload, files) {
    // Comprobamos si existe un usuario con el id del token.
    const user = await getUserById(userId);

    // Si no existe lanzamos un error.
    if (!user) {
        notFound();
    }

    // Actualizamos el usuario.
    const updatedUser = {
        id: userId,
        name: userPayload.name || user.name,
        surname1: userPayload.surname1 || user.surname1,
        surname2: userPayload.surname2 || user.surname2,
        country: userPayload.country || user.country,
    };

    if (files) {
        updatedUser.profilePicture = await processUploadedPostPhoto(
            userId,
            files.profilePicture
        );
    } else {
        updatedUser.profilePicture = user.profilePicture;
    }
    await updateUser(updatedUser);
}

//Editar un post
async function editPost(postId, userId, postPayload) {
    const post = await getPostById(postId);
    if (!post) {
        notFound();
    }

    if (post.userId != userId) {
        unauthorizedUser();
    }

    const updatedPost = {
        title: postPayload.title || post.title,
        description: postPayload.description || post.description,
        photo1: postPayload.photo1,
        photo2: postPayload.photo2,
        photo3: postPayload.photo3,
        id: postId,
    };

    console.log(updatedPost);

    await updatePost(updatedPost);
}

//Editar un comentario
async function editComment(commentId, userId, commentPayload) {
    const comment = await getCommentById(commentId);
    if (!comment) {
        notFound();
    }
    if (comment.userId != userId) {
        unauthorizedUser();
    }
    await updateComment(commentId, commentPayload);
}

module.exports = {
    editUser,
    editPost,
    editComment,
};
