const fs = require("fs");
const fsp = require("fs").promises;

const path = require("path");

async function deletePublic() {
  // Ruta del directorio
  const ruta = path.join(__dirname, "../public/photos");

  if (fs.existsSync(ruta)) {
    //devuelve un array
    const carpetas = await fsp.readdir(ruta);

    for (const carpeta of carpetas) {
      const rutaCarpeta = path.join(ruta, carpeta);
      const stats = await fsp.lstat(rutaCarpeta);

      if (stats.isDirectory()) {
        await fsp.rmdir(rutaCarpeta, { recursive: true });
      }
    }
  }
}

module.exports = { deletePublic };
