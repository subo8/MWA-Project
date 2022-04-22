const jwt = require('jsonwebtoken');
const util = require('util');

const authenticate = function (req, res, next) {
    const response = {
        status: process.env.RESP201,
        message: {}
    }

    const headerExists = req.headers.authorization;

    if (headerExists) {
        const jwtVerifyPromise = util.promisify(jwt.verify, { context: jwt });
        const token = req.headers.authorization.split(" ")[1];
        jwtVerifyPromise(token, process.env.JWT_PASSWORD)
            .then(() => next())
            .catch((err) => this._invalidAuthToken(err, res, response));
    } else {
        response.status = process.env.RESP401;
        response.message = { "message": "Empty token!" };
        this._sendResponse(res, response);
    }
}

_sendResponse = function (res, response) {
    res.status(response.status).json(response.message);
}

_invalidAuthToken = function (err, res, response) {
    response.status = process.env.RESP401;
    response.message = "Unauthorized";
    this._sendResponse(res, response);
}

module.exports = {
    authenticate,
}
