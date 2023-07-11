const { getConnection } = require("../connection.js");

const db = getConnection();


//saveValidationCode (podriamos meter esta en los insert)
//Funcion que inserta el codigo validado
async function saveValidationCode(code) {
    const statement = `
    INSERT INTO validation_codes(id,userId,code)
    VALUES(?,?,?)
    `;
    await db.execute(statement, [code.id, code.userId, code.code]);
}

//getValidationCodeByUser
//Funcion que devuelve el codigo de validacion
async function getValidationCodeByUserId(userId) {
    const statement = `
    SELECT *
    FROM validation_codes
    WHERE userId = ?
    `;
    const [rows] = await db.execute(statement, [userId]);
    
    return rows[0];
  }
  
  //setEmailValidated
  //Funcion que confirma que el email esta validado
  async function setEmailValidated(userId) {
      const statement = `
        UPDATE users
        SET emailValidated = true
        WHERE id = ?
      `;
      await db.execute(statement, [userId]);
  }

//deleteValidationCOde
//Funcion que borra el codigo de validacion
async function deleteValidationCode(codeId) {
    const statement = `
      DELETE FROM validation_codes
      WHERE id = ?
    `;
    await db.execute(statement, [codeId]);
}


module.exports= {
    saveValidationCode,
    getValidationCodeByUserId,
    deleteValidationCode,
    setEmailValidated
}
