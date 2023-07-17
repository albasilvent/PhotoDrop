// Crear todas las tablas

async function createTables(pool) {
    //users
    await pool.query(`
      CREATE TABLE users(
          id VARCHAR(100) PRIMARY KEY,
          name VARCHAR(150) NOT NULL,
          surname1 VARCHAR(150) NOT NULL,
          surname2 VARCHAR(150),
          email VARCHAR(150) NOT NULL UNIQUE,
          password VARCHAR(150) NOT NULL,
          birthDate DATE NOT NULL,
          country VARCHAR(150),
          acceptedTOS BOOL NOT NULL,
          emailValidated BOOL DEFAULT false,
          profilePicture VARCHAR(300),
          admin BOOL DEFAULT false
      )`);

    //posts
    await pool.query(`
      CREATE TABLE posts(
          id VARCHAR(100) PRIMARY KEY,
          title VARCHAR(150) NOT NULL,
          description TEXT NOT NULL,
          photo1 VARCHAR(300) NOT NULL,
          photo2 VARCHAR(300),
          photo3 VARCHAR(300),
          userId VARCHAR(100) NOT NULL,
          createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
      )`);

    //likes
    await pool.query(`
      CREATE TABLE post_likes(
          id VARCHAR(100) PRIMARY KEY,
          userId VARCHAR(100) NOT NULL,
          postId VARCHAR(100) NOT NULL,
          FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE,
          FOREIGN KEY (postId) REFERENCES posts(id) ON DELETE CASCADE
      )`);

    //comments
    await pool.query(`
      CREATE TABLE post_comments(
          id VARCHAR(100) PRIMARY KEY,
          userId VARCHAR(100) NOT NULL,
          postId VARCHAR(100) NOT NULL,
          comment VARCHAR(300) NOT NULL,
          createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE,
          FOREIGN KEY (postId) REFERENCES posts(id) ON DELETE CASCADE
      )`);

    //validation-codes
    await pool.query(`
      CREATE TABLE validation_codes(
          id VARCHAR(100) PRIMARY KEY,
          userId VARCHAR(100) NOT NULL,
          code CHAR(8) NOT NULL,
          createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
      )`);
}

module.exports = { createTables };
