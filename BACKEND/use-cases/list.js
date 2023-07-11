//Funcion que devuelve todos los post en orden cronologico
const { getAllPosts } = require("../database/funciones/post.js");

async function listPosts() {
    return await getAllPosts();
}

module.exports = {
    listPosts,
};
