const { generateUUID, hashPassword } = require("../services/crypto");
const { faker } = require("@faker-js/faker");

//Funcion para meter un admin en la base de datos
async function insertAdminUsers(
    pool,
    name,
    surname1,
    surname2,
    email,
    password,
    birthDate
) {
    await pool.execute(
        `
        INSERT INTO users(id,name,surname1,surname2,email,password,birthDate,acceptedTOS,emailValidated,profilePicture,admin) 
        VALUES(?,?,?,?,?,?,?,?,?,?,?)  
      `,
        [
            generateUUID(),
            `${name}`,
            `${surname1}`,
            `${surname2}`,
            `${email}`,
            await hashPassword(`${password}`),
            `${birthDate}`,
            true,
            true,
            faker.image.urlPicsumPhotos(),
            true,
        ]
    );
}

module.exports = {
    insertAdminUsers,
};
