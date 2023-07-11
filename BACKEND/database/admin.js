const { generateUUID, hashPassword } = require("../services/crypto");

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
        INSERT INTO users(id,name,surname1,surname2,email,password,birthDate,acceptedTOS,emailValidated,admin) 
        VALUES(?,?,?,?,?,?,?,?,?,?)  
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
            true,
        ]
    );
}

module.exports = {
    insertAdminUsers,
};
