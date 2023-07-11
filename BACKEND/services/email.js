//Usamos mailjet
const mailjet = require("node-mailjet").apiConnect(
    `${process.env.MJ_APIKEY_PUBLIC}`,
    `${process.env.MJ_APIKEY_PRIVATE}`
);
require("dotenv").config();

let email = process.env.MAIL_SENDER_FROM;
let fromName = process.env.MAIL_SENDER_NAME;

//Creamos una funcion que envie el email
async function sendEmail(emailTo, name, validationCode) {
    await mailjet.post("send", { version: "v3.1" }).request({
        Messages: [
            {
                From: {
                    Email: email,
                    Name: fromName,
                },
                To: [
                    {
                        Email: `${emailTo}`,
                        Name: `${name}`,
                    },
                ],
                Subject:
                    "Te damos la bienvenida a PhotoDrop - Valida tu correo",
                HTMLPart: `<h1>Te damos la bienvenida a PhotoDrop</h1>
            Muchas gracias por registrarte en PhotoDrop, ${name}. Para poder acceder a todos nuestros servicios deberás validar tu correo con el siguiente código:
            </br>
            <pre>${validationCode}</pre>
            </br>
            Esperamos que disfrutes de la app.
            Un saludo cordial, el equipo de PhotoDrop.
            `,
            },
        ],
    });
}

module.exports = { sendEmail };
