const { getConnection } = require("../connection.js");

const db = getConnection();

//Save user
//Funcion que guarda un usuario
async function saveUser(user) {
    const statement = `
    INSERT INTO users(id,name,surname1,surname2,email,password,birthDate,country,acceptedTOS,emailValidated)
    VALUES(?,?,?,?,?,?,?,?,?,?)
    `;

    await db.execute(statement, [
        user.id,
        user.name,
        user.surname1,
        user.surname2 || null,
        user.email,
        user.password,
        user.birthDate,
        user.country || null,
        user.acceptedTOS,
        user.emailValidated,
    ]);
}

//getUserByEmail
//Funcion que devuelve el user segun el email
async function getUserByEmail(email) {
    const statement = `
      SELECT id,name,email,emailValidated, profilePicture
      FROM users
      WHERE users.email = ?
    `;
    const [rows] = await db.execute(statement, [email]);

    return rows[0];
}

//getUserByID
//Funcion que devuelve todos los datos del usuario
async function getUserById(userId) {
    const userStatement = `
      SELECT users.id, users.name, users.surname1, users.surname2, users.email, users.password,
      users.birthDate, users.country, users.acceptedTOS, users.emailValidated,
      users.profilePicture, users.admin, COUNT(posts.id) AS postCount
      FROM users
      LEFT JOIN posts ON users.id = posts.userId
      WHERE users.id = ?
      GROUP BY users.id;
    `;

    const postStatement = `
      SELECT photo1, photo2, photo3
      FROM posts
      WHERE userId = ?;
    `;

    const [userRows] = await db.execute(userStatement, [userId]);

    if (userRows.length === 0) {
        return null; // No se encontró ningún usuario con el ID dado
    }

    const user = userRows[0];

    const [postRows] = await db.execute(postStatement, [userId]);
    const posts = postRows.map((row) => ({
        photo1: row.photo1,
        photo2: row.photo2,
        photo3: row.photo3,
    }));

    user.posts = posts;

    return user;
}

async function getUserPosts(userId) {
  const userStatement = `
    SELECT id, name, surname1, profilePicture, COUNT(posts.id) AS postCount
    FROM users
    LEFT JOIN posts ON users.id = posts.userId
    WHERE users.id = ?
    GROUP BY users.id;
  `;

  const postStatement = `
    SELECT photo1, photo2, photo3
    FROM posts
    WHERE userId = ?;
  `;

  const [userRows] = await db.execute(userStatement, [userId]);

  if (userRows.length === 0) {
    return null; // No se encontró ningún usuario con el ID dado
  }

  const user = userRows[0];

  const [postRows] = await db.execute(postStatement, [userId]);
  const posts = postRows.map((row) => ({
    photo1: row.photo1,
    photo2: row.photo2,
    photo3: row.photo3,
  }));

  user.posts = posts;

  return user;
}


async function getUserPosts(userId) {
    const userStatement = `
    SELECT users.id, users.name, users.profilePicture, COUNT(posts.id) AS postCount
    FROM users
    LEFT JOIN posts ON users.id = posts.userId
    WHERE users.id = ?
    GROUP BY users.id;
  `;

    const postStatement = `
    SELECT id, title, description, photo1, photo2, photo3, createdAt
    FROM posts
    WHERE userId = ?;
  `;

    const [userRows] = await db.execute(userStatement, [userId]);

    if (userRows.length === 0) {
        return null; // No se encontró ningún usuario con el ID dado
    }

    const user = userRows[0];

    const [postRows] = await db.execute(postStatement, [userId]);
    const posts = postRows.map((row) => ({
        id: row.id,
        title: row.title,
        description: row.description,
        photo1: row.photo1,
        photo2: row.photo2,
        photo3: row.photo3,
        createdAt: row.createdAt,
    }));

    user.posts = posts;

    return user;
}

//getPassword
//Funcion que devuelve la contraseña
async function getPassword(email) {
    const statement = `
      SELECT password
      FROM users
      WHERE users.email = ?
    `;
    const [rows] = await db.execute(statement, [email]);

    return rows[0];
}

//updateUsers
//Funcion para modificar un user
async function updateUser(user) {
    const statement = `
      UPDATE users
      SET name = ?, surname1 = ?, surname2 = ?, country = ?, profilePicture= ?
      WHERE id = ?
    `;

    await db.execute(statement, [
        user.name,
        user.surname1,
        user.surname2,
        user.country,
        user.profilePicture,
        user.id,
    ]);
}

module.exports = {
    saveUser,
    getUserByEmail,
    getUserById,
    getPassword,
    updateUser,
    getUserPosts,
};
