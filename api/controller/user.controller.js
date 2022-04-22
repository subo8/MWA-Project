/**
 * Water me
 * user.controller.js
 */
"use strict";
const mongoose = require('mongoose');
const Users = mongoose.model(process.env.WATER_MODEL);

const _sendResponse = function (res, response) {
    res.status(response.status).json(response.message);
}

const _handleError = function (err, response) {
    response.status = process.env.RESP500;
    response.message = err;
}

const _onSuccessfulUsersGet = function (users, response) {
    response.message = process.env.RESP200;
    response.message = users;
}

const _nullUser = function (response) {
    response.status = process.env.RESP400;
    response.message = { "message": "User ID not found!" };
}

const _onSuccessfulUserCreation = function (createdUser, response) {
    response.status = process.env.RESP201;
    response.message = createdUser;
}

const _onSuccessfulUserUpdate = function (updateUser, response) {
    response.status = process.env.RESP200;
    response.message = updateUser;
}

const _onSuccessfulDelete = function (deletedUser, response) {
    response.status = process.env.RESP200;
    response.message = deletedUser;
}

const create = function (req, res) {
    const response = {
        status: process.env.RESP200,
        message: {}
    }
    const { name, gender, age, weigth } = req.body;
    if (!name || !gender || !age || !weigth) {
        response.status = process.env.RESP400;
        response.message = { message: "Please Include all field" };
        res.status(response.status).json(response.message);
    } else if (isNaN(age) || isNaN(weigth)) {
        response.status = process.env.RESP400;
        response.message = { message: "Age and weight must be digits" };
        res.status(response.status).json(response.message);
    } else {
        const newUser = {
            name: name,
            gender: gender,
            age: parseInt(age),
            weigth: parseInt(weigth),
            consumption: []
        }
        Users.create(newUser)
            .then((createdUser) => _onSuccessfulUserCreation(createdUser, response))
            .catch((err) => _handleError(err, response))
            .finally(() => _sendResponse(res, response));
    }
}

const getAll = function (req, res) {
    const response = {
        status: process.env.RESP200,
        message: {}
    }

    let offset = parseInt(process.env.OFFSET);
    let count = parseInt(process.env.LIMIT);
    let search = null;
    const maxLimit = parseInt(process.env.MAX_LIMIT, 10);
    const maxOffset = parseInt(process.env.MAX_OFFSET, 10);

    if (req.query && req.query.count) count = parseInt(req.query.count);
    if (req.query && req.query.offset) offset = parseInt(req.query.offset);

    if (req.query && req.query.search) {
        search = {
            name: {
                $regex: req.query.search
            }
        }
    }

    if (isNaN(count) || isNaN(offset)) {
        response.status = process.env.RESP400;
        response.message = { "message": "Count is other than the number!" };
        res.status(response.status).json(response.message);
    } else if (maxLimit < count || maxOffset < offset) {
        response.status = process.env.RESP400;
        response.message = { "message": "Exceeded limit or offset" };
        res.status(response.status).json(response.message);
    } else {
        Users.find(search).skip(offset).limit(count)
            .then((users) => _onSuccessfulUsersGet(users, response))
            .catch((err) => _handleError(err, response))
            .finally(() => _sendResponse(res, response));
    }
}

const getOne = function (req, res) {
    const response = {
        status: process.env.RESP200,
        message: {}
    }

    const userID = req.params.userID;
    Users.findById(userID)
        .then((user) => {
            if (!user) {
                _nullUser(response);
            } else {
                _onSuccessfulUsersGet(user, response)
            }
        })
        .catch((err) => _handleError(err, response))
        .finally(() => _sendResponse(res, response));
}

const _updateOne = function (req, res, updateUserCallback) {
    const response = {
        status: process.env.RESP200,
        message: {}
    }

    const userID = req.params.userID;
    Users.findById(userID)
        .then((user) => {
            if (!user) {
                _nullUser(response);
            } else {
                updateUserCallback(req, res, user, response);
            }
        })
        .catch((err) => _handleError(err, response))
        .finally(() => _sendResponse(res, response));
}

const fullUpdate = function (req, res) {
    const { name, gender, age, weigth } = req.body;
    const userUpdate = function (req, res, user, response) {
        if (!name || !gender || !age || !weigth) {
            response.status = process.env.RESP400;
            response.message = { "message": "Please Include all field" };
        } else if (isNaN(age) || isNaN(weigth)) {
            response.status = process.env.RESP400;
            response.message = { "message": "Age and weight must be digits" };
        } else {
            user.name = name;
            user.gender = gender;
            user.age = age;
            user.weigth = weigth;
            user.consumption = user.consumption;
            user.save()
                .then((updateUser) => _onSuccessfulUserUpdate(updateUser, response))
                .catch((err) => _handleError(err, response))
        }
    }
    _updateOne(req, res, userUpdate);
}

const partialUpdate = function (req, res) {
    const { name, gender, age, weigth } = req.body;
    const userUpdate = function (req, res, user, response) {
        user.name = name || user.name;
        user.gender = gender || user.gender;
        user.age = age || user.age;
        user.weigth = weigth || user.weigth;
        user.consumption = user.consumption;
        user.save()
            .then((updateUser) => _onSuccessfulUserUpdate(updateUser, response))
            .catch((err) => _handleError(err, response))
    }
    _updateOne(req, res, userUpdate);
}

const deleteOne = function (req, res) {
    const response = {
        status: process.env.RESP200,
        message: {}
    }
    const userID = req.params.userID;
    Users.findByIdAndDelete(userID)
        .then((deletedUser) => _onSuccessfulDelete(deletedUser, response))
        .catch((err) => _handleError(err, response))
        .finally(() => _sendResponse(res, response));
}

module.exports = {
    create,
    getAll,
    getOne,
    fullUpdate,
    partialUpdate,
    deleteOne,
}