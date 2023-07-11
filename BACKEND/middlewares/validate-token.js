//Validar el token

const { parseJWT } = require("../services/JWT");

function validateToken(req, res, next) {
  const token = req.headers.authorization;

  if (token) {
    const user = parseJWT(token);
    if (user) {
      req.currentUser = user;
    } else {
      req.currentUser = null;
    }
  } else {
    req.currentUser = null;
  }
  next();
};

module.exports= {validateToken};