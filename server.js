/**
 * Water me
 * server.js
 */

"use strict";

console.log("Water-Me app is running");

const dotenv = require('dotenv').config();
require('./api/data/db.js');

const express = require('express');
const PORT = process.env.PORT;
const PORT_MSG = process.env.LISTEN_PORT_MSG;
const userRoutes = require('./api/routes/userRoutes');
const consumptionRoutes = require('./api/routes/consumptionRoutes');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/", function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:4200");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT, DELETE");
    next();
});

app.get('/', function (req, res) {
    res.status(process.env.RESP200).json({ message: 'This is home page!' });
});

app.use('/api/users', userRoutes, consumptionRoutes);

const server = app.listen(PORT, function () {
    console.log(PORT_MSG, server.address().port);
});