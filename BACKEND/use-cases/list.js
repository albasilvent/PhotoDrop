//Funcion que devuelve todos los post en orden cronologico
const { getAllPosts } = require("../database/funciones/post.js");
const { getCommentsByPostId } = require("../database/funciones/comment.js");
const { likesCountPost, getLike } = require("../database/funciones/like.js");

async function listPosts(userId) {
    const posts = await getAllPosts();

    for (const post of posts) {
        post.comments = await getCommentsByPostId(post.postId);
        post.likes = await likesCountPost(post.postId);
        if (userId) {
            post.alreadyLiked = await getLike(post.postId, userId);
        }
    }

    return posts;
}

module.exports = {
    listPosts,
};
