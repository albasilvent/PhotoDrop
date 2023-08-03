const { getConnection } = require("../connection.js");

const db = getConnection();

//save comment
//Funcion que guarda comentarios
async function saveComment(postComment) {
    const statement = `
    INSERT INTO post_comments(id,userId,postId,comment)
    VALUES(?,?,?,?)
    `;
    await db.execute(statement, [
        postComment.id,
        postComment.userId,
        postComment.postId,
        postComment.comment,
    ]);
}

//getCommentById
//Funcion que devuelve un comentario
async function getCommentById(commentId) {
    const statement = `
    SELECT * FROM post_comments
    WHERE id = ?
    `;
    const [rows] = await db.execute(statement, [commentId]);
    return rows[0];
}

//getCommentsByPostId
//Funcion que devuelve los comentarios de un post
async function getCommentsByPostId(postId) {
    const statement = `
      SELECT cp.*, u.name AS userName, u.surname1 AS surname1, u.profilePicture
      FROM post_comments AS cp
      INNER JOIN users AS u ON cp.userId = u.id
      WHERE cp.postId = ?
      ORDER BY cp.createdAt ASC;
    `;
  
    const [rows] = await db.execute(statement, [postId]);
  
    return rows;
  }
  
  
  

//updateComment
//Funcion que edita un comentario
async function updateComment(commentId, commentPayload) {
    const statement = `
    UPDATE post_comments
    SET comment = ?
    WHERE id = ?
    `;
    await db.execute(statement, [commentPayload.comment, commentId]);
}

//deleteComment
// Funcion que borra un comentario

async function deleteComment(commentId) {
    const statement = `
    DELETE FROM post_comments
    WHERE id = ?
    `;
    await db.execute(statement, [commentId]);
}


module.exports = {
    saveComment,
    getCommentById,
    getCommentsByPostId,
    updateComment,
    deleteComment
};
