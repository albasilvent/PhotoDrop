//Funcion que permite buscar un post
const { searchByTerm } = require("../database/funciones/post.js");

async function search({ search }) {
    const post = await searchByTerm(search);
    return post;
}

module.exports = {
    search,
};
