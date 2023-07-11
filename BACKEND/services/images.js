//Todas las funciones sobre las imagenes de los post y sus rutas
const path = require("path");
const fs = require("fs/promises");
const sharp = require("sharp");
const { generateUUID } = require("../services/crypto");

//processUploadedPostPhoto.
async function processUploadedPostPhoto(userId, photo) {
    const directory = path.join(__dirname, "../public/photos", userId); // Directorio donde se guarda la foto

    try {
        await fs.mkdir(directory, { recursive: true }); // Asegurarse de que el directorio exista

        // Procesar la primera foto con sharp.
        const sharpPhoto = sharp(photo.data);

        // Redimensionamos la imagen a 500px.
        sharpPhoto.resize(500);

        // Establecer un fileName, que será el nombre final del archivo nuevo.
        const fileName = generateUUID() + ".jpg";

        // Crear la ruta absoluta al archivo.
        const filePath = path.join(directory, fileName);

        // Guardamos la foto.
        await sharpPhoto.toFile(filePath);

        // Retornamos el nombre del archivo.
        return fileName;
    } catch (error) {
        // Manejo de errores si ocurre algún problema durante el proceso
        console.error("Error al procesar la foto:", error);
        throw error;
    }
}

module.exports = {
    processUploadedPostPhoto,
};
