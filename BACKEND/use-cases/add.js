const { generateUUID } = require("../services/crypto");
const { saveComment } = require("../database/funciones/comment");
const { getPostById, savePost } = require("../database/funciones/post");
const { notFound } = require("../services/errors");
const { processUploadedPostPhoto } = require("../services/images");
const { getUserById } = require("../database/funciones/users");

//addPost
//Funcion que añade un post
async function addPost(currentUserId, postPayload, files) {
    const post = {
        id: generateUUID(),
        title: postPayload.title,
        description: postPayload.description,
        photo1: await processUploadedPostPhoto(currentUserId, files.photo1),
        userId: currentUserId,
    };

    // Si existe la foto 2...
    if (files.photo2) {
        post.photo2 = await processUploadedPostPhoto(
            currentUserId,
            files.photo2
        );
    }

    // Si existe la foto 3...
    if (files.photo3) {
        post.photo3 = await processUploadedPostPhoto(
            currentUserId,
            files.photo3
        );
    }

    await savePost(post);
}

//addComment
//Funcion que añade un comentario
async function addComment(postId, currentUserId, commentPayload) {
    const post = await getPostById(postId);

    if (!post) {
        notFound();
    }

    const user = await getUserById(currentUserId);

    const comment = {
        postId: postId,
        userId: currentUserId,
        comment: commentPayload.comment,
        id: generateUUID(),
        userName: user.name,
        surname1: user.surname1,
        profilePicture: user.profilePicture,
    };
    await saveComment(comment);

    return comment;
}

module.exports = {
    addPost,
    addComment,
};
