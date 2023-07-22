//Funcion que devuelve todos los post en orden cronologico
const { getAllPosts } = require("../database/funciones/post.js");
const { getCommentsByPostId } = require("../database/funciones/comment.js");
const { likesCountPost } = require("../database/funciones/like.js");

async function listPosts() {
    const posts = await getAllPosts();
    
    for (const post of posts) {
      post.comments = await getCommentsByPostId(post.postId);
      post.likes = await likesCountPost(post.postId);
    }
    
    return posts;
  }
  

module.exports = {
    listPosts,
};
