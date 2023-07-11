//Conectar la base de datos
//Requerimos la funcion de init.js y la llamamos getDb.
require("dotenv").config();
const { createPool } = require("./connection.js");
const { createTables } = require("./tables.js");
const { generateFakeData } = require("./data.js");
const {insertAdminUsers} = require("./admin.js");
const { deletePublic } = require("./delete-public.js");

//Variables de ambiente para insertar el admin
const DATABASE_NAME = process.env.MYSQL_DATABASE;
const DB_ADMIN_NAME = process.env.DB_ADMIN_NAME;
const DB_ADMIN_SURNAME1 = process.env.DB_ADMIN_SURNAME1;
const DB_ADMIN_SURNAME2 = process.env.DB_ADMIN_SURNAME2;
const DB_ADMIN_EMAIL = process.env.DB_ADMIN_EMAIL;
const DB_ADMIN_PASSWORD = process.env.DB_ADMIN_PASSWORD;
const DB_ADMIN_DATE = process.env.DB_ADMIN_DATE;

//Iniciamos la base de datos
async function initDB() {
  const pool = createPool();
  //BORRO LA BASE DE DATOS SI EXISTE
  await pool.query(`DROP DATABASE IF EXISTS ${DATABASE_NAME}`);
  //CREO LA BASE DE DATOS
  await pool.query(`CREATE DATABASE IF NOT EXISTS ${DATABASE_NAME}`);
  await pool.query(`USE ${DATABASE_NAME}`);

  //Metemos las tablas
  await createTables(pool);
  //Metemos los users
  await insertAdminUsers(pool,DB_ADMIN_NAME,DB_ADMIN_SURNAME1,DB_ADMIN_SURNAME2,DB_ADMIN_EMAIL,DB_ADMIN_PASSWORD,DB_ADMIN_DATE)
  //Rellenamos la base de datos
  await generateFakeData(pool);

  await deletePublic();

  //Cerramos la conexion
  await pool.end();
}

initDB();
