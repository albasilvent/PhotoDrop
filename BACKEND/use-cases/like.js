const { generateUUID } = require("../services/crypto");
const { getPostById } = require("../database/funciones/post");
const { notFound } = require("../services/errors");
const {
    createLike,
    deleteLikeByUserId,
    getLike,
} = require("../database/funciones/like");

//Funcion que añade o elimina un like de un post
async function toggleLike(postId, userId) {
    const post = await getPostById(postId);
    if (!post) {
        notFound();
    }
    if (await getLike(postId, userId)) {
        await deleteLikeByUserId(postId, userId);
    } else {
        await createLike({
            id: generateUUID(),
            postId: postId,
            userId: userId,
        });
    }
}

module.exports = {
    toggleLike,
};
