/**
 * Water me
 * db.js
 */
"use strict";

const mongoose = require('mongoose');
require('./users-model');

mongoose.connect(process.env.DB_URL);

mongoose.connection.on("connected", function () {
    console.log("Mongoose connected to " + process.env.DB_URL);
});

mongoose.connection.on("disconnected", function () {
    console.log("Mongoose disconnected");
});

mongoose.connection.on("error", function (err) {
    console.log("Mongoose error", err);
});

process.on("SIGINT", function () {
    mongoose.connection.close(function () {
        console.log(process.env.SIGINT_MESSAGE);
        process.exit(0);
    });
});

process.on("SIGTERM", function () {
    mongoose.connection.close(function () {
        console.log(process.env.SIGTERM_MESSAGE);
        process.exit(0);
    });
});


