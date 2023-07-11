require("dotenv").config();

const path = require("path");
const express = require("express");
const cors = require("cors");
const indexRouter = require("./routes/index-router.js");
const { validateToken } = require("./middlewares/validate-token.js");
const { sendError } = require("./services/errors.js");

const app = express();
//Añadimos el puerto
const PORT = 5000;

const staticDirectory = path.join(__dirname, "./public");
app.use(express.static(staticDirectory));

app.use(
    cors({
        origin: ["https://photoDrop.es", "http://localhost:5000"],
    })
);

app.use(validateToken);
app.use(indexRouter);

app.use((err, req, res, next) => {
    console.error(err);
    sendError(res, err);
});

app.use((req, res, next) => {
    sendError(res, {
        status: 404,
        code: "UNKNOWN_ENDPOINT",
        message: `Endpoint desconocido: ${req.method} ${req.path}`,
    });
});

app.listen(PORT, () => {
    console.log(`Server iniciado en el puerto ${PORT}...`);
});
