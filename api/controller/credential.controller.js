"use strict";

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Credential = mongoose.model(process.env.CREDENTIAL_MODEL);

const _sendResponse = function (res, response) {
    res.status(response.status).json(response.message);
}

const _handleError = function (err, response) {
    response.status = process.env.RESP500;
    response.message = err;
}
const regUser = function (req, res) {
    console.log("Register user controller");
    const response = {
        status: process.env.RESP200,
        message: {}
    }
    const { name, username, password, repeatpassword } = req.body;

    if (req.body && req.body.username && req.body.password) {


        bcrypt.genSalt(parseInt(process.env.SALT_ROUNDS), function (err, salt) {
            if (err) {
                response.status = process.env.RESP500;
                response.message = err;
                _sendResponse(res, response);
            } else {
                bcrypt.hash(password, salt, function (err, passwordHash) {
                    if (err) {
                        response.status = process.env.RESP500;
                        response.message = err;
                        _sendResponse(res, response);
                    } else {
                        const newCredential = {
                            name: name,
                            username: username,
                            password: passwordHash
                        }
                        Credential.create(newCredential, function (err, user) {
                            if (err) {
                                response.status = process.env.RESP500;
                                response.message = err;
                            } else {
                                response.status = process.env.RESP201;
                                response.message = user;
                            }
                            _sendResponse(res, response);
                        });
                    }
                });
            }
        });
    }
}

const login = function (req, res) {
    console.log('login controller called');

    const response = {
        status: process.env.RESP200,
        message: {}
    }
    if (req.body && req.body.username && req.body.password) {
        Credential.findOne({ username: req.body.username })
            .then((user) => _checkUserPassword(user, req, response))
            .catch((err) => _handleError(err, response))
            .finally(() => _sendResponse(res, response));
    } else {
        _sendResponse(res, response);
    }
}

const _checkUserPassword = function (user, req, response) {
    if (!user) {
        console.log("Username not in database");
        response.status = process.env.RESP401;
        response.message = { "message": "Unauthorized" };
    } else {
        if (bcrypt.compareSync(req.body.password, user.password)) {
            response.status = process.env.RESP200;
            const token = jwt.sign({ name: user.name }, process.env.JWT_PASSWORD, { expiresIn: 3600 });
            response.message = { succes: true, token: token };
        } else {
            console.log("Password Incorrect");
            response.status = process.env.RESP401;
            response.message = { "message": "Unauthorized" };
        }
    }
}



module.exports = {
    regUser: regUser,
    login: login,
}