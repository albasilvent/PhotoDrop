const { getPostById } = require("../database/funciones/post.js");
const { getUserPosts } = require("../database/funciones/users.js");
const { notFound } = require("../services/errors.js");
const { getCommentsByPostId } = require("../database/funciones/comment.js");
const { likesCountPost, getLike } = require("../database/funciones/like.js");

//Funcion que devuelve todos los datos de un post
async function viewPost(postId, userId) {
    const post = await getPostById(postId);
    if (!post) {
        notFound();
    }
    post.comments = await getCommentsByPostId(postId);
    post.likes = await likesCountPost(postId);
    if (userId) {
        post.alreadyLiked = await getLike(post.postId, userId);
    }
    return post;
}

async function viewUser(userId) {
    const user = await getUserPosts(userId);
    if (!user) {
        notFound();
    }

    return user;
}

module.exports = {
    viewPost,
    viewUser,
};
