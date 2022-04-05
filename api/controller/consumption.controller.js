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

const getAll = function (req, res) {
    const userID = req.params.userID;

    let offset = parseInt(process.env.OFFSET);
    let count = parseInt(process.env.LIMIT);
    const maxLimit = parseInt(process.env.MAX_LIMIT, 10);
    const maxOffset = parseInt(process.env.MAX_OFFSET, 10);

    if (req.query && req.query.count) count = parseInt(req.query.count);
    if (req.query && req.query.offset) offset = parseInt(req.query.offset);


    if (isNaN(count) || isNaN(offset)) {
        response.status = process.env.RESP400;
        response.message = "Count is other than the number!";
        res.status(response.status).json(response.message);
    } else if (maxLimit < count || maxOffset < offset) {
        response.status = process.env.RESP400;
        response.message = "Exceeded limit or offset";
        res.status(response.status).json(response.message);
    } else {
        Users.findById(userID).select("consumption").exec(function (err, user) {
            if (err) {
                response.status = process.env.RESP500;
                response.message = err;
            } else if (!user) {
                response.status = process.env.RESP400;
                response.message = "No user found";
            } else {
                response.message = user.consumption.slice(0, count);
            }
            res.status(response.status).json(response.message);
        });
    }
}

const create = function (req, res) {
    const userID = req.params.userID;
    const size = req.body.size;

    if (!size) {
        response.status = process.env.RESP400;
        response.message = { message: "Please insert size!" };
        res.status(response.status).json(response.message);
    } else if (parseInt(size) >= process.env.MAX_SIZE) {
        response.status = process.env.RESP500;
        response.message = { message: `Max size exceeded than ${process.env.MAX_SIZE}` };
        res.status(response.status).json(response.message);
    } else {
        Users.findById(userID).select("consumption").exec(function (err, user) {
            if (err) {
                response.status = process.env.RESP500;
                response.message = err;
                res.status(response.status).json(response.message);
            } else if (!user) {
                response.status = process.env.RESP400;
                response.message = "User not found";
                res.status(response.status).json(response.message);
            } else {
                const consumption = user.consumption;
                consumption.addToSet(req.body);
                user.save(function () {
                    res.status(process.env.RESP201).json(user);
                });
            }
        });
    }
}

const getOne = function (req, res) {
    const userID = req.params.userID;
    Users.findById(userID).select("consumption").exec(function (err, user) {
        if (err) {
            response.status = process.env.RESP500;
            response.message = err;
        } else if (!user) {
            response.status = process.env.RESP400;
            response.message = { "message": "User not found" };
        } else {
            const consumption = user.consumption.id(req.params.consumptionID);
            if (!consumption) {
                response.status = process.env.RESP400;
                response.message = { "message": "Consumption not found" };
            } else {
                response.status = process.env.RESP200;
                response.message = consumption;
            }
        }
        res.status(response.status).json(response.message);
    });
}

const _updateOne = function (req, res, updateConsumptionCallback) {
    const userID = req.params.userID;
    Users.findById(userID).select("consumption").exec(function (err, user) {
        if (err) {
            response.status = process.env.RESP500;
            response.message = err;
        } else if (!user) {
            console.log("User ID not found!");
            response.status = process.env.RESP400;
            response.message = { "message": "User ID not found!" }
        }
        if (response.status !== process.env.RESP200) {
            res.status(response.status).json(response.message);
        }
        updateConsumptionCallback(req, res, user, response);
    });
}

const _fullConsumptionUpdate = function (req, res, user) {
    const size = req.body.size;
    if (!size) {
        response.status = process.env.RESP400;
        response.message = { "message": "Please insert update ssize!" };
        res.status(response.status).json(response.message);
    } else if (parseInt(size) >= process.env.MAX_CONSUMPTION) {
        response.status = process.env.RESP500;
        response.message = { "message": `Max size exceeded than ${process.env.MAX_SIZE}` };
        res.status(response.status).json(response.message);
    } else {
        const consumption = user.consumption.id(req.params.consumptionID);
        if (!consumption) {
            response.status = process.env.RESP400;
            response.message = { "message": "Consumption id not found!" };
            res.status(response.status).json(response.message);
        } else {
            consumption.size = size;
            user.save(function (err, updatedConsumption) {
                if (err) {
                    response.status = process.env.RESP500;
                    response.message = err;
                } else if (!updatedConsumption) {
                    response.statuss = process.env.RESP400;
                    response.message = { "message": "Consumption not found" };
                } else {
                    response.message = { "message": `Consumption _id: ${updatedConsumption._id} updated` }
                }
                res.status(response.status).json(response.message);
            });
        }
    }
}

const _partialConsumptionUpdate = function (req, res, user) {
    const size = req.body.size;
    const consumption = user.consumption.id(req.params.consumptionID);

    if (!consumption) {
        response.status = process.env.RESP400;
        response.message = { "message": "Consumption id not found!" };
        res.status(response.status).json(response.message);
    } else {
        consumption.size = size || consumption.size;
        user.save(function (err, updatedConsumption) {
            if (err) {
                response.status = process.env.RESP500;
                response.message = err;
            } else if (!updatedConsumption) {
                response.status = process.env.RESP400;
                response.message = { "message": "Consumption not found" };
            } else {
                response.message = { "message": `Consumption _id: ${updatedConsumption._id} updated` }
            }
            res.status(response.status).json(response.message);
        });
    }
}

const fullUpdate = function (req, res) {
    console.log("Full update one", req.body);
    _updateOne(req, res, _fullConsumptionUpdate);
}

const partialUpdate = function (req, res) {
    console.log("Partial update one");
    _updateOne(req, res, _partialConsumptionUpdate);
}

const deleteOne = function (req, res) {
    const userID = req.params.userID;
    Users.findById(userID).select("consumption").exec(function (err, user) {
        if (err) {
            response.status = process.env.RESP500;
            response.message = err;
            res.status(response.status).json(response.message);
        } else if (!user) {
            response.status = process.env.RESP400;
            response.message = "User not found";
            res.status(response.status).json(response.message);
        } else {
            const consumption = user.consumption.id(req.params.consumptionID);
            if (!consumption) {
                response.status = process.env.RESP400;
                response.message = "Consumption not found";
                res.status(response.status).json(response.message);
            } else {
                consumption.remove();
                user.save(function () {
                    res.status(process.env.RESP200).json(`Delete successfully!`);
                });
            }
        }
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