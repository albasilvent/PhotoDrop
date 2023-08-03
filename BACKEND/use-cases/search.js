//Funcion que permite buscar un post
const { getCommentsByPostId } = require("../database/funciones/comment.js");
const { likesCountPost } = require("../database/funciones/like.js");

const { searchByTerm } = require("../database/funciones/post.js");

async function search({ search }) {
    const posts = await searchByTerm(search);

    for (const post of posts) {
        post.comments = await getCommentsByPostId(post.postId);
        post.likes = await likesCountPost(post.postId);
      }
      
    return posts;
}

module.exports = {
    search,
};
