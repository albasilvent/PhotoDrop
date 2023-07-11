const { getConnection } = require("../connection.js");

const db = getConnection();

//createLike (podiramos meterlo en los inserts)
//Funcion que crea un like
async function createLike(like) {
    const statement = `
    INSERT INTO post_likes(id,userId,postId)
    VALUES(?,?,?)
    `;
    await db.execute(statement, [like.id, like.userId, like.postId]);
}

//getLike
//Funcion que comprueba si un like existe
async function getLike(postId, userId) {
    const statement = `
    SELECT * FROM post_likes
    WHERE postId = ? and userId = ?
    `;
    const [rows] = await db.execute(statement, [postId, userId]);
    return !!rows[0];
}

//deleteLikeByUserId
//Funcion que borra el like
async function deleteLikeByUserId(postId, userId) {
    const statement = `
    DELETE FROM post_likes
    WHERE postId = ? and userId = ?
    `;
    await db.execute(statement, [postId, userId]);
}

//countLikesByPostId (a esto hay que cambiarle el nombre)
//Funcion que devuelve el numero de likes segun el post
async function likesCountPost(postId) {
    const statement = `
    SELECT COUNT(*) as likes FROM post_likes
    WHERE postId = ?
    `;
    const [rows] = await db.execute(statement, [postId]);
    return rows[0].likes;
}



module.exports= {
    createLike,
    getLike,
    deleteLikeByUserId,
    likesCountPost,
}
