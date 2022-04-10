/**
 * Water me
 * user.controller.js
 */

"use strict";
const mongoose = require('mongoose');
const Users = mongoose.model(process.env.WATER_MODEL);

const response = {
    status: process.env.RESP200,
    message: {}
}

const create = function (req, res) {
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
        Users.create(newUser, function (err, user) {
            if (err) {
                response.status = process.env.RESP500;
                response.message = err;
            } else {
                response.status = process.env.RESP201;
                response.message = user;
            }
            res.status(response.status).json(response.message);
        });
    }
}

const getAll = function (req, res) {
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
        Users.find(search).skip(offset).limit(count).exec(function (err, users) {
            if (err) {
                response.status = process.env.RESP500;
                response.message = err;
            } else {
                response.message = users;
            }
            res.status(response.status).json(response.message);
        });
    }
}

const getOne = function (req, res) {
    const userID = req.params.userID;
    Users.findById(userID).exec(function (err, user) {
        if (err) {
            response.status = process.env.RESP500;
            response.message = err;
        } else if (!user) {
            response.status = process.env.RESP400;
            response.message = { "message": "User not found! Better check user ID!" };
        } else {
            response.message = user;
        }
        res.status(response.status).json(response.message);
    });
}


const _updateOne = function (req, res, updateUserCallback) {
    const userID = req.params.userID;
    Users.findById(userID).exec(function (err, user) {
        if (err) {
            response.status = process.env.RESP500;
            response.message = err;
        } else if (!user) {
            response.status = process.env.RESP400;
            response.message = { "message": "User ID not found!" }
        }
        if (response.status !== process.env.RESP200) {
            res.status(response.status).json(response.message);
        } else {
            updateUserCallback(req, res, user, response);
        }
    });
}

const fullUpdate = function (req, res) {
    const { name, gender, age, weigth } = req.body;
    const userUpdate = function (req, res, user, response) {
        if (!name || !gender || !age || !weigth) {
            response.status = process.env.RESP400;
            response.message = { "message": "Please Include all field" };
            res.status(response.status).json(response.message);
        } else if (isNaN(age) || isNaN(weigth)) {
            response.status = process.env.RESP400;
            response.message = { "message": "Age and weight must be digits" };
            res.status(response.status).json(response.message);
        } else {
            user.name = name;
            user.gender = gender;
            user.age = age;
            user.weigth = weigth;
            user.consumption = user.consumption;
            user.save(function (err, updatedUser) {
                if (err) {
                    response.status = process.env.RESP500;
                    response.message = err;
                } else if (!updatedUser) {
                    response.status = process.env.RESP400;
                    response.message = { "message": "User not found! Better check user ID!" };
                } else {
                    response.message = { "message": `User _id: ${user._id} updated` };
                }
                res.status(response.status).json(response.message);
            });
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
        user.save(function (err, updatedUser) {
            if (err) {
                response.status = process.env.RESP500;
                response.message = err;
            } else if (!updatedUser) {
                response.status = process.env.RESP400;
                response.message = { "message": "User not found! Better check user ID!" };
            } else {
                response.message = { "message": `User _id: ${user._id} updated` };
            }
            res.status(response.status).json(response.message);
        });

    }
    _updateOne(req, res, userUpdate);
}

const deleteOne = function (req, res) {
    const userID = req.params.userID;
    Users.findByIdAndDelete(userID, function (err, user) {
        if (err) {
            response.status = process.env.RESP500;
            response.message = err;
        } else if (!user) {
            response.status = process.env.RESP400;
            response.message = { "message": "User not found! Better check user ID!" };
        } else {
            response.message = { "message": `User _id: ${user._id} deleted successfully` };
        }
        res.status(response.status).json(response.message);
    });
}

module.exports = {
    create,
    getAll,
    getOne,
    fullUpdate,
    partialUpdate,
    deleteOne,
}