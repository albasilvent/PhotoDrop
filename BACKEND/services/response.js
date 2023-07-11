//Funcion que envia la respuesta
function sendResponse(res, data, status = 200) {
        res.status(status).json({
            success: true,
            data,
        });
};

module.exports = {
    sendResponse,
};
